const express = require("express");
const cors = require("cors");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));

// Middleware للتحقق من هوية وصلاحية المستخدم
const authMiddleware = (req, res, next) => {
  const roleHeader = req.headers["x-user-role"] || "Guest";
  const userIdHeader = req.headers["x-user-id"] || null;
  req.auth = { role: roleHeader, userId: userIdHeader };
  next();
};

app.use("/api", authMiddleware);

// 1. تسجيل الدخول الموحد والذكي لجميع الأدوار
app.post("/api/auth/login", (req, res) => {
  const { email } = req.body;
  const data = db.get();

  if (!email) {
    return res.status(400).json({ error: "البريد الإلكتروني مطلوب" });
  }

  const cleanEmail = email.trim().toLowerCase();

  // فحص المدير العام
  const admin = data.admins.find((a) => a.email.toLowerCase() === cleanEmail);
  if (admin)
    return res.json({ user: admin, role: "Admin", token: "token-admin" });

  // فحص المفسرين
  const interpreter = data.interpreters.find(
    (i) => i.email.toLowerCase() === cleanEmail,
  );
  if (interpreter)
    return res.json({
      user: interpreter,
      role: "Interpreter",
      token: "token-int",
    });

  // فحص المستخدمين
  let user = data.users.find((u) => u.email.toLowerCase() === cleanEmail);
  if (user) {
    if (user.status === "inactive")
      return res
        .status(403)
        .json({ error: "تم تعطيل هذا الحساب من قبل الإدارة" });
    return res.json({ user, role: "User", token: "token-user" });
  }

  // إنشاء حساب فوري في وضع التجربة السريعة
  const newUser = {
    id: `usr_${Date.now()}`,
    name: cleanEmail.split("@")[0],
    email: cleanEmail,
    role: "User",
    status: "active",
    phone: "",
    createdAt: new Date().toISOString(),
  };
  data.users.push(newUser);
  db.save(data);
  return res.json({ user: newUser, role: "User", token: "token-user" });
});

// 2. إدارة وتصفية الطلبات
app.get("/api/orders", (req, res) => {
  const data = db.get();
  const { role, userId } = req.auth;

  let results = data.orders;

  if (role === "User") {
    results = results.filter((o) => o.userId === userId);
  } else if (role === "Interpreter") {
    results = results.filter(
      (o) => !o.assignedInterpreterId || o.assignedInterpreterId === userId,
    );
  }

  // دمج بيانات التفسير المعتمدة مع كل طلب
  const enriched = results.map((order) => {
    const interpretation = data.interpretations.find(
      (i) => i.orderId === order.id,
    );
    return { ...order, interpretation: interpretation || null };
  });

  res.json(
    enriched.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  );
});

app.post("/api/orders", (req, res) => {
  const data = db.get();
  const {
    title,
    dreamText,
    audioUrl,
    dreamDate,
    maritalStatus,
    employmentStatus,
    isPrivate,
    userId,
    userName,
  } = req.body;

  if (!title || (!dreamText && !audioUrl)) {
    return res.status(400).json({
      error: "يرجى إدخال عنوان الرؤيا وكتابة تفاصيلها أو تسجيلها صوتياً",
    });
  }

  const newOrder = {
    id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
    userId: userId || req.auth.userId || "usr_guest",
    userName: userName || "صاحب الرؤيا",
    title,
    dreamText: dreamText || "",
    audioUrl: audioUrl || null,
    dreamDate: dreamDate || new Date().toISOString().split("T")[0],
    maritalStatus: maritalStatus || "غير محدد",
    employmentStatus: employmentStatus || "غير محدد",
    isPrivate: isPrivate !== false,
    status: "جديد",
    assignedInterpreterId: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.orders.push(newOrder);

  // إشعار فوري للرائي
  data.notifications.push({
    id: `notif_${Date.now()}`,
    userId: newOrder.userId,
    title: "تم استلام رؤيتك",
    message: `تم إرسال طلبك (${newOrder.title}) بنجاح وهو الآن في انتظار المفسر.`,
    orderId: newOrder.id,
    read: false,
    createdAt: new Date().toISOString(),
  });

  db.save(data);
  res.status(201).json(newOrder);
});

app.patch("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, assignedInterpreterId } = req.body;
  const data = db.get();

  const orderIndex = data.orders.findIndex((o) => o.id === id);
  if (orderIndex === -1)
    return res.status(404).json({ error: "الطلب غير موجود" });

  if (status) data.orders[orderIndex].status = status;
  if (assignedInterpreterId !== undefined)
    data.orders[orderIndex].assignedInterpreterId = assignedInterpreterId;
  data.orders[orderIndex].updatedAt = new Date().toISOString();

  data.notifications.push({
    id: `notif_${Date.now()}`,
    userId: data.orders[orderIndex].userId,
    title: "تحديث على حالة الطلب",
    message: `أصبحت حالة طلبك (${data.orders[orderIndex].title}): ${status}`,
    orderId: id,
    read: false,
    createdAt: new Date().toISOString(),
  });

  db.save(data);
  res.json(data.orders[orderIndex]);
});

// 3. تقديم التفسير من المفسر المعتمد (نصي وصوتي)
app.post("/api/orders/:id/interpret", (req, res) => {
  const { id } = req.params;
  const { text, audioUrl, internalNotes, interpreterId, interpreterName } =
    req.body;
  const data = db.get();

  const order = data.orders.find((o) => o.id === id);
  if (!order) return res.status(404).json({ error: "الطلب غير موجود" });

  let interp = data.interpretations.find((i) => i.orderId === id);
  if (interp) {
    interp.text = text || interp.text;
    interp.audioUrl = audioUrl || interp.audioUrl;
    interp.internalNotes = internalNotes || interp.internalNotes;
    interp.updatedAt = new Date().toISOString();
  } else {
    interp = {
      id: `INT-${Math.floor(5000 + Math.random() * 5000)}`,
      orderId: id,
      interpreterId: interpreterId || req.auth.userId,
      interpreterName: interpreterName || "الشيخ أحمد المنصور",
      text: text || "",
      audioUrl: audioUrl || null,
      internalNotes: internalNotes || "",
      createdAt: new Date().toISOString(),
    };
    data.interpretations.push(interp);
  }

  // تحديث حالة الطلب إلى تم التسليم
  order.status = "تم التسليم";
  order.assignedInterpreterId = interp.interpreterId;
  order.updatedAt = new Date().toISOString();

  // زيادة عدد التفسيرات للمفسر
  const interpreterObj = data.interpreters.find(
    (i) => i.id === interp.interpreterId,
  );
  if (interpreterObj)
    interpreterObj.totalInterpreted =
      (interpreterObj.totalInterpreted || 0) + 1;

  // إشعار المستخدم
  data.notifications.push({
    id: `notif_${Date.now()}`,
    userId: order.userId,
    title: "تم الانتهاء من تفسير رؤيتك",
    message: `قام ${interp.interpreterName} بتفسير رؤيتك (${order.title}). يمكنك مراجعتها والاستماع إليها الآن.`,
    orderId: order.id,
    read: false,
    createdAt: new Date().toISOString(),
  });

  db.save(data);
  res.json({ order, interpretation: interp });
});

// 4. الإحصائيات ولوحة الإدارة
app.get("/api/admin/stats", (req, res) => {
  const data = db.get();
  const totalUsers = data.users.length;
  const totalInterpreters = data.interpreters.length;
  const totalOrders = data.orders.length;
  const newOrders = data.orders.filter((o) => o.status === "جديد").length;
  const completedOrders = data.orders.filter(
    (o) => o.status === "تم التسليم" || o.status === "تم التفسير",
  ).length;
  const inProgressOrders = data.orders.filter(
    (o) => o.status === "قيد التفسير" || o.status === "قيد المراجعة",
  ).length;

  res.json({
    totalUsers,
    totalInterpreters,
    totalOrders,
    newOrders,
    completedOrders,
    inProgressOrders,
    recentOrders: data.orders.slice(-5).reverse(),
  });
});

app.get("/api/users", (req, res) => {
  const data = db.get();
  res.json(data.users);
});

app.patch("/api/users/:id/toggle", (req, res) => {
  const data = db.get();
  const user = data.users.find((u) => u.id === req.params.id);
  if (!user) return res.status(404).json({ error: "المستخدم غير موجود" });
  user.status = user.status === "active" ? "inactive" : "active";
  db.save(data);
  res.json(user);
});

app.get("/api/interpreters", (req, res) => {
  const data = db.get();
  res.json(data.interpreters);
});

app.post("/api/interpreters", (req, res) => {
  const data = db.get();
  const { name, email, bio, specializedIn } = req.body;
  const newInt = {
    id: `int_${Date.now()}`,
    name,
    email,
    role: "Interpreter",
    status: "active",
    bio: bio || "مفسر معتمد وفق الضوابط الشرعية",
    specializedIn: specializedIn || "تعبير الرؤى العامة",
    totalInterpreted: 0,
    rating: 5.0,
  };
  data.interpreters.push(newInt);
  db.save(data);
  res.status(201).json(newInt);
});

app.patch("/api/interpreters/:id", (req, res) => {
  const data = db.get();
  const interpreter = data.interpreters.find((i) => i.id === req.params.id);
  if (!interpreter) return res.status(404).json({ error: "المفسر غير موجود" });
  Object.assign(interpreter, req.body);
  db.save(data);
  res.json(interpreter);
});

app.get("/api/notifications", (req, res) => {
  const data = db.get();
  const { userId, role } = req.auth;
  let notifs = data.notifications;
  if (role === "User" && userId) {
    notifs = notifs.filter((n) => n.userId === userId);
  }
  res.json(notifs.reverse());
});

app.patch("/api/notifications/:id/read", (req, res) => {
  const data = db.get();
  const notif = data.notifications.find((n) => n.id === req.params.id);
  if (notif) notif.read = true;
  db.save(data);
  res.json({ success: true });
});

app.get("/api/settings", (req, res) => {
  const data = db.get();
  res.json(data.settings);
});

app.put("/api/settings", (req, res) => {
  const data = db.get();
  data.settings = { ...data.settings, ...req.body };
  db.save(data);
  res.json(data.settings);
});

app.post("/api/admin/reset-demo", (req, res) => {
  db.resetDemoData();
  res.json({ message: "تمت استعادة البيانات التجريبية بنجاح" });
});

app.listen(PORT, () => {
  console.log(`منصة تعبير الليلية تعمل الآن على: http://localhost:${PORT}`);
});
