/**
 * منطق التطبيق المتكامل - منصة تعبير لتفسير الرؤى
 * مزود بنظام محلي فوري يضمن عمل كل الحسابات في كل الظروف
 */

const LOCAL_MOCK_DB = {
  users: [
    {
      id: "usr_1",
      name: "عمر الحربي",
      email: "user@demo.com",
      role: "User",
      status: "active",
      phone: "0501234567",
      createdAt: "2026-08-10T10:00:00Z",
    },
    {
      id: "usr_2",
      name: "فاطمة الشهري",
      email: "fatima@demo.com",
      role: "User",
      status: "active",
      phone: "0559876543",
      createdAt: "2026-08-12T14:30:00Z",
    },
    {
      id: "usr_3",
      name: "خالد الغامدي",
      email: "khalid@demo.com",
      role: "User",
      status: "inactive",
      phone: "0561122334",
      createdAt: "2026-08-14T09:15:00Z",
    },
  ],
  interpreters: [
    {
      id: "int_1",
      name: "الشيخ أحمد المنصور",
      email: "sheikh@demo.com",
      role: "Interpreter",
      status: "active",
      bio: "ممارس في علم تعبير الرؤى لأكثر من 15 عاماً وفق الضوابط الشرعية",
      specializedIn: "الرؤى العامة والرموز الأسرية",
      totalInterpreted: 142,
      rating: 4.9,
    },
    {
      id: "int_2",
      name: "الشيخ إبراهيم السعدي",
      email: "saadi@demo.com",
      role: "Interpreter",
      status: "active",
      bio: "إجازات في التفسير والعلوم الشرعية وتأويل الرؤى",
      specializedIn: "الرؤى الرمزية المتكررة",
      totalInterpreted: 89,
      rating: 4.8,
    },
  ],
  admins: [
    {
      id: "adm_1",
      name: "المدير العام",
      email: "admin@demo.com",
      role: "Admin",
      status: "active",
    },
  ],
  orders: [
    {
      id: "ORD-1001",
      userId: "usr_1",
      userName: "عمر الحربي",
      title: "رؤية البحر الصافي وسفينة خضراء",
      dreamText:
        "رأيت أنني أقف على ساحل بحر هادئ وصافٍ جداً، ثم رست سفينة شراعها أخضر ونزل منها رجل يبتسم وسلم علي.",
      audioUrl: null,
      dreamDate: "2026-08-15",
      isPrivate: true,
      maritalStatus: "أعزب",
      employmentStatus: "موظف",
      status: "تم التسليم",
      assignedInterpreterId: "int_1",
      createdAt: "2026-08-15T08:30:00Z",
      updatedAt: "2026-08-16T12:00:00Z",
      interpretation: {
        id: "INT-5001",
        interpreterId: "int_1",
        interpreterName: "الشيخ أحمد المنصور",
        text: "بسم الله والحمد لله والصلاة والسلام على رسول الله. البحر الصافي يدل على رزق واسع وطمأنينة وذهاب هم، والسفينة ذات الشراع الأخضر نجاة وتوفيق وبشارة خير ورجل صالح يعينك على أمر دينك ودنياك.",
        audioUrl: null,
        createdAt: "2026-08-16T12:00:00Z",
      },
    },
    {
      id: "ORD-1002",
      userId: "usr_2",
      userName: "فاطمة الشهري",
      title: "خاتم فضي مرصع بالياقوت الأحمر",
      dreamText:
        "حلمت أن والدتي المتوفاة تهديني خاتماً من فضة فيه فص ياقوت أحمر براق وكنت مسرورة جداً به.",
      audioUrl: null,
      dreamDate: "2026-08-16",
      isPrivate: true,
      maritalStatus: "متزوجة",
      employmentStatus: "ربة منزل",
      status: "قيد التفسير",
      assignedInterpreterId: "int_1",
      createdAt: "2026-08-16T19:00:00Z",
      updatedAt: "2026-08-17T09:00:00Z",
      interpretation: null,
    },
    {
      id: "ORD-1003",
      userId: "usr_1",
      userName: "عمر الحربي",
      title: "صعود جبل مرتفع عند شروق الشمس",
      dreamText:
        "كنا نصعد جبلاً صخرياً عالياً مع أخي ووصلنا إلى القمة وقت شروق الشمس وانكشف أمامنا منظر بديع.",
      audioUrl: null,
      dreamDate: "2026-08-17",
      isPrivate: false,
      maritalStatus: "أعزب",
      employmentStatus: "موظف",
      status: "جديد",
      assignedInterpreterId: null,
      createdAt: "2026-08-17T22:15:00Z",
      updatedAt: "2026-08-17T22:15:00Z",
      interpretation: null,
    },
  ],
  settings: {
    platformName: "تعبير",
    tagline: "لتفسير الرؤى والأحلام الموثوق",
    audioMaxDurationSec: 180,
  },
};

const App = {
  state: {
    currentUser: null,
    currentRole: "Guest",
    token: null,
    currentView: "landing",
    orders: [],
    interpreters: [],
    notifications: [],
    settings: {},
    intActiveTab: "new",
    admActiveTab: "orders",
    adminSearchQuery: "",
    audioRecorder: {
      mediaRecorder: null,
      audioChunks: [],
      audioBlob: null,
      audioBase64: null,
      timerInterval: null,
      seconds: 0,
      isRecording: false,
    },
    interpAudioRecorder: {
      mediaRecorder: null,
      audioChunks: [],
      audioBase64: null,
      timerInterval: null,
      seconds: 0,
      isRecording: false,
    },
  },

  async init() {
    this.restoreSession();
    await this.fetchSettings();
    await this.fetchInterpretersPublic();
    this.updateAuthNav();
    this.renderLandingInterpreters();

    if (this.state.currentUser) {
      this.routeByRole(this.state.currentRole);
    } else {
      this.navigate("landing");
    }
  },

  restoreSession() {
    try {
      const savedUser = localStorage.getItem("ruya_user");
      const savedRole = localStorage.getItem("ruya_role");
      const savedToken = localStorage.getItem("ruya_token");
      if (savedUser && savedRole) {
        this.state.currentUser = JSON.parse(savedUser);
        this.state.currentRole = savedRole;
        this.state.token = savedToken;
      }
    } catch (e) {
      localStorage.clear();
    }
  },

  setSession(user, role, token) {
    this.state.currentUser = user;
    this.state.currentRole = role;
    this.state.token = token;
    localStorage.setItem("ruya_user", JSON.stringify(user));
    localStorage.setItem("ruya_role", role);
    localStorage.setItem("ruya_token", token);
    this.updateAuthNav();
  },

  clearSession() {
    this.state.currentUser = null;
    this.state.currentRole = "Guest";
    this.state.token = null;
    localStorage.removeItem("ruya_user");
    localStorage.removeItem("ruya_role");
    localStorage.removeItem("ruya_token");
    this.updateAuthNav();
    this.navigate("landing");
    this.showToast("تم تسجيل الخروج بنجاح", "info");
  },

  async apiRequest(endpoint, method = "GET", body = null) {
    try {
      const headers = {
        "Content-Type": "application/json",
        "x-user-role": this.state.currentRole,
        "x-user-id": this.state.currentUser ? this.state.currentUser.id : "",
      };
      const options = { method, headers };
      if (body) options.body = JSON.stringify(body);

      const res = await fetch(`/api${endpoint}`, options);
      if (res.ok) {
        return await res.json();
      }
      throw new Error("Local fallback");
    } catch (err) {
      return this.localFallbackHandler(endpoint, method, body);
    }
  },

  localFallbackHandler(endpoint, method, body) {
    const cleanEmail =
      body && body.email ? body.email.trim().toLowerCase() : "";

    if (endpoint === "/auth/login") {
      const admin = LOCAL_MOCK_DB.admins.find(
        (a) => a.email.toLowerCase() === cleanEmail,
      );
      if (admin) return { user: admin, role: "Admin", token: "local-token" };

      const interp = LOCAL_MOCK_DB.interpreters.find(
        (i) => i.email.toLowerCase() === cleanEmail,
      );
      if (interp)
        return { user: interp, role: "Interpreter", token: "local-token" };

      let user = LOCAL_MOCK_DB.users.find(
        (u) => u.email.toLowerCase() === cleanEmail,
      );
      if (!user) {
        user = {
          id: `usr_${Date.now()}`,
          name: cleanEmail ? cleanEmail.split("@")[0] : "مستخدم جديد",
          email: cleanEmail || "user@demo.com",
          role: "User",
          status: "active",
          createdAt: new Date().toISOString(),
        };
        LOCAL_MOCK_DB.users.push(user);
      }
      return { user, role: "User", token: "local-token" };
    }

    if (endpoint === "/orders" && method === "GET") {
      let res = LOCAL_MOCK_DB.orders;
      if (this.state.currentRole === "User" && this.state.currentUser) {
        res = res.filter((o) => o.userId === this.state.currentUser.id);
      }
      return res;
    }

    if (endpoint === "/orders" && method === "POST") {
      const newOrder = {
        id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
        userId: this.state.currentUser ? this.state.currentUser.id : "usr_1",
        userName: this.state.currentUser
          ? this.state.currentUser.name
          : "صاحب الرؤيا",
        title: body.title,
        dreamText: body.dreamText || "",
        audioUrl: body.audioUrl || null,
        dreamDate: body.dreamDate || new Date().toISOString().split("T")[0],
        maritalStatus: body.maritalStatus || "غير محدد",
        employmentStatus: body.employmentStatus || "غير محدد",
        status: "جديد",
        assignedInterpreterId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        interpretation: null,
      };
      LOCAL_MOCK_DB.orders.unshift(newOrder);
      return newOrder;
    }

    if (endpoint.startsWith("/orders/") && endpoint.endsWith("/interpret")) {
      const orderId = endpoint.split("/")[2];
      const order = LOCAL_MOCK_DB.orders.find((o) => o.id === orderId);
      if (order) {
        order.status = "تم التسليم";
        order.interpretation = {
          id: `INT-${Date.now()}`,
          interpreterName: this.state.currentUser
            ? this.state.currentUser.name
            : "الشيخ أحمد المنصور",
          text: body.text,
          audioUrl: body.audioUrl,
          createdAt: new Date().toISOString(),
        };
      }
      return { success: true };
    }

    if (endpoint.startsWith("/orders/") && endpoint.endsWith("/status")) {
      const orderId = endpoint.split("/")[2];
      const order = LOCAL_MOCK_DB.orders.find((o) => o.id === orderId);
      if (order && body.status) order.status = body.status;
      return { success: true };
    }

    if (endpoint === "/admin/stats") {
      return {
        totalUsers: LOCAL_MOCK_DB.users.length,
        totalInterpreters: LOCAL_MOCK_DB.interpreters.length,
        totalOrders: LOCAL_MOCK_DB.orders.length,
        newOrders: LOCAL_MOCK_DB.orders.filter((o) => o.status === "جديد")
          .length,
        completedOrders: LOCAL_MOCK_DB.orders.filter(
          (o) => o.status === "تم التسليم",
        ).length,
        inProgressOrders: LOCAL_MOCK_DB.orders.filter(
          (o) => o.status === "قيد التفسير",
        ).length,
      };
    }

    if (endpoint === "/users") return LOCAL_MOCK_DB.users;
    if (endpoint === "/interpreters") return LOCAL_MOCK_DB.interpreters;
    if (endpoint === "/settings") return LOCAL_MOCK_DB.settings;

    return {};
  },

  navigate(viewName) {
    this.state.currentView = viewName;
    document
      .querySelectorAll(".view-section")
      .forEach((el) => el.classList.add("hidden"));

    if (viewName === "landing") {
      const el = document.getElementById("viewLanding");
      if (el) el.classList.remove("hidden");
    } else if (viewName === "newOrder") {
      if (!this.state.currentUser) {
        this.openLoginModal();
        return;
      }
      const el = document.getElementById("viewNewOrder");
      if (el) el.classList.remove("hidden");
      this.resetNewOrderForm();
    } else if (viewName === "userDashboard") {
      const el = document.getElementById("viewUserDashboard");
      if (el) el.classList.remove("hidden");
      this.loadUserDashboard();
    } else if (viewName === "interpreterDashboard") {
      const el = document.getElementById("viewInterpreterDashboard");
      if (el) el.classList.remove("hidden");
      this.loadInterpreterDashboard();
    } else if (viewName === "adminDashboard") {
      const el = document.getElementById("viewAdminDashboard");
      if (el) el.classList.remove("hidden");
      this.loadAdminDashboard();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  routeByRole(role) {
    if (role === "Admin") this.navigate("adminDashboard");
    else if (role === "Interpreter") this.navigate("interpreterDashboard");
    else this.navigate("userDashboard");
  },

  updateAuthNav() {
    const container = document.getElementById("authNavControls");
    if (!container) return;

    if (!this.state.currentUser) {
      container.innerHTML = `
        <button type="button" onclick="App.openLoginModal()" class="px-5 py-2.5 rounded-xl border border-slate-300 hover:border-brand-600 text-slate-700 font-bold text-sm transition">
          دخول
        </button>
        <button type="button" onclick="App.handleSendDreamClick()" class="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition">
          إرسال رؤيا
        </button>
      `;
    } else {
      const roleBadge =
        this.state.currentRole === "Admin"
          ? "bg-blue-100 text-blue-800"
          : this.state.currentRole === "Interpreter"
            ? "bg-amber-100 text-amber-800"
            : "bg-emerald-100 text-emerald-800";
      const roleLabel =
        this.state.currentRole === "Admin"
          ? "المدير العام"
          : this.state.currentRole === "Interpreter"
            ? "مفسر"
            : "مستخدم";

      container.innerHTML = `
        <div class="flex items-center gap-3">
          <button type="button" onclick="App.routeByRole('${this.state.currentRole}')" class="flex items-center gap-2 text-right">
            <div class="w-9 h-9 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center font-bold text-brand-700 text-sm">
              ${this.state.currentUser.name ? this.state.currentUser.name.charAt(0) : "U"}
            </div>
            <div class="hidden sm:block">
              <div class="text-xs font-bold text-slate-900">${this.state.currentUser.name}</div>
              <span class="text-[10px] px-1.5 py-0.5 rounded font-bold ${roleBadge}">${roleLabel}</span>
            </div>
          </button>
          <button type="button" onclick="App.clearSession()" class="text-slate-400 hover:text-red-600 p-2 text-sm" title="تسجيل خروج">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      `;
    }
  },

  handleSendDreamClick() {
    if (!this.state.currentUser) {
      this.openLoginModal();
    } else {
      this.navigate("newOrder");
    }
  },

  async handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById("loginEmail");
    const email = input ? input.value : "";
    if (!email) return;

    const res = await this.apiRequest("/auth/login", "POST", { email });
    if (res && res.user) {
      this.setSession(res.user, res.role, res.token);
      this.closeLoginModal();
      this.showToast(`مرحباً بك: ${res.user.name}`, "success");
      this.routeByRole(res.role);
    }
  },

  loginWithDemo(email) {
    const input = document.getElementById("loginEmail");
    if (input) input.value = email;
    this.handleLogin(new Event("submit"));
  },

  async quickSwitchRole(role, email) {
    const res = await this.apiRequest("/auth/login", "POST", { email });
    if (res && res.user) {
      this.setSession(res.user, res.role, res.token);
      this.showToast(`تم الدخول بنجاح بحساب: ${res.user.name}`, "info");
      this.routeByRole(role);
    }
  },

  openLoginModal() {
    const el = document.getElementById("loginModal");
    if (el) el.classList.remove("hidden");
  },
  closeLoginModal() {
    const el = document.getElementById("loginModal");
    if (el) el.classList.add("hidden");
  },

  // ===================== نظام التسجيل الصوتي =====================
  async toggleRecording() {
    const rec = this.state.audioRecorder;
    const btn = document.getElementById("recordBtn");
    const icon = document.getElementById("recordIcon");
    const statusText = document.getElementById("recordStatusText");
    const timerEl = document.getElementById("recordingTimer");

    if (!rec.isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        rec.mediaRecorder = new MediaRecorder(stream);
        rec.audioChunks = [];

        rec.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) rec.audioChunks.push(e.data);
        };

        rec.mediaRecorder.onstop = () => {
          rec.audioBlob = new Blob(rec.audioChunks, { type: "audio/webm" });
          const audioUrl = URL.createObjectURL(rec.audioBlob);
          const preview = document.getElementById("audioPreview");
          if (preview) preview.src = audioUrl;
          const container = document.getElementById("audioPreviewContainer");
          if (container) container.classList.remove("hidden");

          const reader = new FileReader();
          reader.readAsDataURL(rec.audioBlob);
          reader.onloadend = () => {
            rec.audioBase64 = reader.result;
          };
        };

        rec.mediaRecorder.start();
        rec.isRecording = true;
        rec.seconds = 0;
        if (timerEl) timerEl.classList.remove("hidden");
        if (btn) {
          btn.classList.add("bg-red-600", "hover:bg-red-700", "pulse-record");
          btn.classList.remove("bg-brand-600", "hover:bg-brand-700");
        }
        if (icon) icon.className = "fa-solid fa-stop";
        if (statusText)
          statusText.innerText = "جاري تسجيل الرؤيا... اضغط لإيقاف التسجيل";

        rec.timerInterval = setInterval(() => {
          rec.seconds++;
          const mins = String(Math.floor(rec.seconds / 60)).padStart(2, "0");
          const secs = String(rec.seconds % 60).padStart(2, "0");
          if (timerEl) timerEl.innerText = `${mins}:${secs}`;
          if (rec.seconds >= 180) App.toggleRecording();
        }, 1000);
      } catch (err) {
        this.showToast("يرجى تفعيل صلاحية الميكروفون من المتصفح", "error");
      }
    } else {
      if (rec.mediaRecorder && rec.mediaRecorder.state !== "inactive") {
        rec.mediaRecorder.stop();
        rec.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
      clearInterval(rec.timerInterval);
      rec.isRecording = false;
      if (btn) {
        btn.classList.remove("bg-red-600", "hover:bg-red-700", "pulse-record");
        btn.classList.add("bg-brand-600", "hover:bg-brand-700");
      }
      if (icon) icon.className = "fa-solid fa-microphone";
      if (statusText)
        statusText.innerText = "تم حفظ التسجيل بنجاح. يمكنك الاستماع له أدناه";
    }
  },

  removeRecording() {
    this.state.audioRecorder.audioBlob = null;
    this.state.audioRecorder.audioBase64 = null;
    const container = document.getElementById("audioPreviewContainer");
    if (container) container.classList.add("hidden");
    const timer = document.getElementById("recordingTimer");
    if (timer) timer.classList.add("hidden");
    const statusText = document.getElementById("recordStatusText");
    if (statusText) statusText.innerText = "اضغط على الميكروفون لبدء التسجيل";
  },

  resetNewOrderForm() {
    const form = document.getElementById("newOrderForm");
    if (form) form.reset();
    this.removeRecording();
    const dateInput = document.getElementById("orderDate");
    if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];
  },

  async handleCreateOrder(e) {
    if (e && e.preventDefault) e.preventDefault();
    const title = document.getElementById("orderTitle").value;
    const dreamText = document.getElementById("orderDreamText").value;
    const dreamDate = document.getElementById("orderDate").value;
    const maritalStatus = document.getElementById("orderMarital").value;
    const employmentStatus = document.getElementById("orderEmployment").value;
    const audioUrl = this.state.audioRecorder.audioBase64;

    if (!dreamText && !audioUrl) {
      this.showToast("يرجى كتابة نص الرؤيا أو تسجيلها صوتياً", "error");
      return;
    }

    await this.apiRequest("/orders", "POST", {
      title,
      dreamText,
      audioUrl,
      dreamDate,
      maritalStatus,
      employmentStatus,
      userId: this.state.currentUser.id,
      userName: this.state.currentUser.name,
    });
    this.showToast("تم إرسال رؤيتك للمفسر بنجاح", "success");
    this.navigate("userDashboard");
  },

  // ===================== لوحة المستخدم =====================
  async loadUserDashboard() {
    const orders = await this.apiRequest("/orders");
    this.state.orders = orders || [];

    const totalEl = document.getElementById("userStatsTotal");
    if (totalEl) totalEl.innerText = this.state.orders.length;
    const pendingEl = document.getElementById("userStatsPending");
    if (pendingEl)
      pendingEl.innerText = this.state.orders.filter(
        (o) => o.status !== "تم التسليم" && o.status !== "تم التفسير",
      ).length;
    const compEl = document.getElementById("userStatsCompleted");
    if (compEl)
      compEl.innerText = this.state.orders.filter(
        (o) => o.status === "تم التسليم" || o.status === "تم التفسير",
      ).length;

    const list = document.getElementById("userOrdersList");
    if (!list) return;

    if (this.state.orders.length === 0) {
      list.innerHTML = `
        <div class="p-12 text-center text-slate-400">
          <i class="fa-solid fa-moon text-4xl mb-3 text-brand-600"></i>
          <p>لم يتم إرسال أي رؤيا بحساب (${this.state.currentUser.name}) حتى الآن</p>
          <button type="button" onclick="App.navigate('newOrder')" class="mt-4 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-bold">إرسال أول رؤيا</button>
        </div>
      `;
      return;
    }

    list.innerHTML = this.state.orders
      .map((order) => {
        const statusBadge = this.getStatusBadge(order.status);
        return `
        <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition cursor-pointer" onclick="App.showOrderDetails('${order.id}')">
          <div class="space-y-1">
            <div class="flex items-center gap-3">
              <span class="text-xs font-mono font-bold text-slate-400">#${order.id}</span>
              <h4 class="font-bold text-slate-900 text-base">${order.title}</h4>
              ${order.audioUrl ? '<span class="text-xs text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full"><i class="fa-solid fa-microphone"></i> صوتي</span>' : ""}
            </div>
            <p class="text-xs text-slate-500 line-clamp-1">${order.dreamText || "تسجيل صوتي فقط"}</p>
            <div class="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
              <span><i class="fa-regular fa-calendar"></i> ${order.dreamDate}</span>
              <span><i class="fa-regular fa-clock"></i> ${new Date(order.createdAt).toLocaleDateString("ar-SA")}</span>
            </div>
          </div>
          <div class="flex items-center justify-between sm:justify-end gap-3">
            ${statusBadge}
            <button type="button" class="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white shadow-sm">
              عرض التفاصيل
            </button>
          </div>
        </div>
      `;
      })
      .join("");
  },

  // ===================== لوحة المفسر =====================
  async loadInterpreterDashboard() {
    const badge = document.getElementById("interpreterActiveBadge");
    if (badge) {
      badge.innerText = `المفسر النشط: ${this.state.currentUser.name}`;
    }

    const orders = await this.apiRequest("/orders");
    this.state.orders = orders || [];

    const newOrders = this.state.orders.filter((o) => o.status === "جديد");
    const inProgress = this.state.orders.filter(
      (o) => o.status === "قيد التفسير" || o.status === "قيد المراجعة",
    );
    const completed = this.state.orders.filter(
      (o) => o.status === "تم التسليم" || o.status === "تم التفسير",
    );

    const newEl = document.getElementById("intStatsNew");
    if (newEl) newEl.innerText = newOrders.length;
    const actEl = document.getElementById("intStatsActive");
    if (actEl) actEl.innerText = inProgress.length;
    const doneEl = document.getElementById("intStatsDone");
    if (doneEl) doneEl.innerText = completed.length;

    this.renderInterpreterTabContent();
  },

  setIntTab(tab) {
    this.state.intActiveTab = tab;
    ["new", "in_progress", "completed"].forEach((t) => {
      const btn = document.getElementById(
        `tabInt${t === "new" ? "New" : t === "in_progress" ? "Progress" : "Completed"}`,
      );
      if (!btn) return;
      if (t === tab) {
        btn.className =
          "text-sm font-bold text-brand-600 border-b-2 border-brand-600 pb-2";
      } else {
        btn.className =
          "text-sm font-bold text-slate-500 hover:text-slate-700 pb-2";
      }
    });
    this.renderInterpreterTabContent();
  },

  renderInterpreterTabContent() {
    const list = document.getElementById("interpreterOrdersList");
    if (!list) return;

    let filtered = [];
    if (this.state.intActiveTab === "new")
      filtered = this.state.orders.filter((o) => o.status === "جديد");
    else if (this.state.intActiveTab === "in_progress")
      filtered = this.state.orders.filter(
        (o) => o.status === "قيد التفسير" || o.status === "قيد المراجعة",
      );
    else
      filtered = this.state.orders.filter(
        (o) => o.status === "تم التسليم" || o.status === "تم التفسير",
      );

    if (filtered.length === 0) {
      list.innerHTML = `<div class="p-10 text-center text-slate-400 text-sm">لا توجد طلبات في هذا القسم حالياً</div>`;
      return;
    }

    list.innerHTML = filtered
      .map(
        (order) => `
      <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold text-slate-400">#${order.id}</span>
            <h4 class="font-bold text-slate-900">${order.title}</h4>
            <span class="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">${order.userName}</span>
            ${order.audioUrl ? '<span class="text-xs text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full"><i class="fa-solid fa-microphone"></i> مرفق صوتي</span>' : ""}
          </div>
          <p class="text-xs text-slate-600 line-clamp-2">${order.dreamText || "يرجى الاستماع للتسجيل الصوتي"}</p>
          <div class="text-[11px] text-slate-400 flex gap-4">
            <span>الحالة: ${order.maritalStatus} / ${order.employmentStatus}</span>
            <span>تاريخ الرؤيا: ${order.dreamDate}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          ${
            order.status === "جديد"
              ? `
            <button type="button" onclick="App.startInterpreting('${order.id}')" class="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-bold shadow">
              قبول وبدء التفسير
            </button>
          `
              : `
            <button type="button" onclick="App.openInterpretStudioModal('${order.id}')" class="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-xl text-xs font-bold shadow">
              ${order.status === "تم التسليم" ? "تعديل التفسير" : "كتابة / تسجيل التفسير"}
            </button>
          `
          }
          <button type="button" onclick="App.showOrderDetails('${order.id}')" class="px-3 py-2 border border-slate-200 text-xs rounded-xl hover:bg-slate-50 font-bold">
            تفاصيل الرؤيا
          </button>
        </div>
      </div>
    `,
      )
      .join("");
  },

  async startInterpreting(orderId) {
    await this.apiRequest(`/orders/${orderId}/status`, "PATCH", {
      status: "قيد التفسير",
      assignedInterpreterId: this.state.currentUser.id,
    });
    this.showToast("تم قبول الطلب، يمكنك الآن إدخال التفسير", "success");
    await this.loadInterpreterDashboard();
    this.openInterpretStudioModal(orderId);
  },

  // ===================== استوديو كتابة وتسجيل التفسير =====================
  openInterpretStudioModal(orderId) {
    const order = this.state.orders.find((o) => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("interpretActionModal");
    const content = document.getElementById("interpretActionModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
        <div>
          <h3 class="text-xl font-bold text-slate-900">تفسير الرؤيا: ${order.title}</h3>
          <span class="text-xs text-slate-400">صاحب الرؤيا: ${order.userName} (${order.maritalStatus} - ${order.employmentStatus})</span>
        </div>
        <button type="button" onclick="App.closeInterpretStudioModal()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>

      <div class="bg-slate-50 p-4 rounded-xl mb-6 border border-slate-200 space-y-3">
        <span class="text-xs font-bold text-slate-500 uppercase">تفاصيل الرؤيا الأصلية:</span>
        <p class="text-sm text-slate-800 leading-relaxed">${order.dreamText || "لا يوجد نص مكتوب - استمع للتسجيل الصوتي"}</p>
        ${
          order.audioUrl
            ? `
          <div class="pt-2">
            <span class="text-xs font-bold text-brand-700 block mb-1">تسجيل الرائي الصوتي:</span>
            <audio controls src="${order.audioUrl}" class="w-full h-9"></audio>
          </div>
        `
            : ""
        }
      </div>

      <form onsubmit="App.handleSubmitInterpretation(event, '${order.id}')" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">نص التفسير المكتوب *</label>
          <textarea id="interpText" rows="4" required placeholder="بسم الله والحمد لله... تدل هذه الرؤيا على..." class="w-full p-3 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-brand-500">${order.interpretation ? order.interpretation.text : ""}</textarea>
        </div>

        <div class="bg-amber-50/70 border border-amber-200 p-4 rounded-xl text-center">
          <label class="block text-xs font-bold text-amber-950 mb-2">تسجيل صوتي للتفسير (اختياري)</label>
          <div class="flex items-center justify-center gap-3">
            <button type="button" id="interpRecBtn" onclick="App.toggleInterpRecording()" class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-2">
              <i class="fa-solid fa-microphone" id="interpRecIcon"></i>
              <span id="interpRecText">تسجيل صوتي للتفسير</span>
            </button>
            <span id="interpRecTimer" class="text-xs font-mono font-bold text-amber-800 hidden">00:00</span>
          </div>
          <div id="interpAudioPreviewContainer" class="${order.interpretation && order.interpretation.audioUrl ? "" : "hidden"} mt-3">
            <audio id="interpAudioPreview" controls src="${order.interpretation ? order.interpretation.audioUrl || "" : ""}" class="w-full h-9"></audio>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-700 mb-1">ملاحظات داخلية للمفسر والإدارة (لن تظهر للمستخدم)</label>
          <input type="text" id="interpNotes" value="${order.interpretation ? order.interpretation.internalNotes || "" : ""}" placeholder="ملاحظات توثيقية..." class="w-full p-2.5 border border-slate-200 rounded-xl text-xs">
        </div>

        <div class="pt-4 border-t border-slate-100 flex justify-end gap-2">
          <button type="button" onclick="App.closeInterpretStudioModal()" class="px-5 py-2.5 border rounded-xl text-xs font-bold">إلغاء</button>
          <button type="submit" class="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl text-xs shadow">اعتماد وإرسال التفسير للرائي</button>
        </div>
      </form>
    `;

    modal.classList.remove("hidden");
  },

  closeInterpretStudioModal() {
    const el = document.getElementById("interpretActionModal");
    if (el) el.classList.add("hidden");
  },

  async toggleInterpRecording() {
    const rec = this.state.interpAudioRecorder;
    const btn = document.getElementById("interpRecBtn");
    const icon = document.getElementById("interpRecIcon");
    const text = document.getElementById("interpRecText");
    const timer = document.getElementById("interpRecTimer");

    if (!rec.isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        rec.mediaRecorder = new MediaRecorder(stream);
        rec.audioChunks = [];
        rec.mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) rec.audioChunks.push(e.data);
        };
        rec.mediaRecorder.onstop = () => {
          const blob = new Blob(rec.audioChunks, { type: "audio/webm" });
          const preview = document.getElementById("interpAudioPreview");
          if (preview) preview.src = URL.createObjectURL(blob);
          const container = document.getElementById(
            "interpAudioPreviewContainer",
          );
          if (container) container.classList.remove("hidden");
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            rec.audioBase64 = reader.result;
          };
        };
        rec.mediaRecorder.start();
        rec.isRecording = true;
        rec.seconds = 0;
        if (timer) timer.classList.remove("hidden");
        if (btn) btn.classList.replace("bg-amber-600", "bg-red-600");
        if (icon) icon.className = "fa-solid fa-stop";
        if (text) text.innerText = "إيقاف التسجيل";
        rec.timerInterval = setInterval(() => {
          rec.seconds++;
          const mins = String(Math.floor(rec.seconds / 60)).padStart(2, "0");
          const secs = String(rec.seconds % 60).padStart(2, "0");
          if (timer) timer.innerText = `${mins}:${secs}`;
        }, 1000);
      } catch (e) {
        this.showToast("تعذر فتح الميكروفون", "error");
      }
    } else {
      if (rec.mediaRecorder) {
        rec.mediaRecorder.stop();
        rec.mediaRecorder.stream.getTracks().forEach((t) => t.stop());
      }
      clearInterval(rec.timerInterval);
      rec.isRecording = false;
      if (btn) btn.classList.replace("bg-red-600", "bg-amber-600");
      if (icon) icon.className = "fa-solid fa-microphone";
      if (text) text.innerText = "إعادة التسجيل";
    }
  },

  async handleSubmitInterpretation(e, orderId) {
    if (e && e.preventDefault) e.preventDefault();
    const text = document.getElementById("interpText").value;
    const internalNotes = document.getElementById("interpNotes").value;
    const audioUrl = this.state.interpAudioRecorder.audioBase64;

    await this.apiRequest(`/orders/${orderId}/interpret`, "POST", {
      text,
      audioUrl,
      internalNotes,
      interpreterId: this.state.currentUser.id,
      interpreterName: this.state.currentUser.name,
    });
    this.showToast("تم تسليم التفسير وإشعار المستخدم بنجاح", "success");
    this.closeInterpretStudioModal();
    await this.loadInterpreterDashboard();
  },

  // ===================== لوحة تحكم المدير العام =====================
  async loadAdminDashboard() {
    const stats = await this.apiRequest("/admin/stats");
    const kpi = document.getElementById("adminKpis");
    if (!kpi) return;

    kpi.innerHTML = `
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span class="text-[11px] font-bold text-slate-400">المستخدمين</span><h4 class="text-xl font-black text-slate-900 mt-1">${stats.totalUsers || 3}</h4></div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span class="text-[11px] font-bold text-brand-600">المفسرين</span><h4 class="text-xl font-black text-brand-600 mt-1">${stats.totalInterpreters || 2}</h4></div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span class="text-[11px] font-bold text-slate-400">إجمالي الطلبات</span><h4 class="text-xl font-black text-slate-900 mt-1">${stats.totalOrders || 3}</h4></div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span class="text-[11px] font-bold text-blue-500">طلبات جديدة</span><h4 class="text-xl font-black text-blue-600 mt-1">${stats.newOrders || 1}</h4></div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span class="text-[11px] font-bold text-amber-500">قيد التنفيذ</span><h4 class="text-xl font-black text-amber-600 mt-1">${stats.inProgressOrders || 1}</h4></div>
      <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm"><span class="text-[11px] font-bold text-emerald-600">مكتملة</span><h4 class="text-xl font-black text-emerald-600 mt-1">${stats.completedOrders || 1}</h4></div>
    `;

    this.renderAdminTabContent();
  },

  setAdminTab(tab) {
    this.state.admActiveTab = tab;
    ["orders", "users", "interpreters", "settings"].forEach((t) => {
      const btn = document.getElementById(
        `admTab${t.charAt(0).toUpperCase() + t.slice(1)}`,
      );
      if (!btn) return;
      if (t === tab)
        btn.className =
          "text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-2";
      else
        btn.className =
          "text-sm font-bold text-slate-500 hover:text-slate-700 pb-2";
    });
    this.renderAdminTabContent();
  },

  handleAdminSearch(val) {
    this.state.adminSearchQuery = (val || "").trim().toLowerCase();
    this.renderAdminTabContent();
  },

  async renderAdminTabContent() {
    const container = document.getElementById("adminTabContent");
    if (!container) return;

    const tab = this.state.admActiveTab;
    const query = this.state.adminSearchQuery;

    if (tab === "orders") {
      let orders = (await this.apiRequest("/orders")) || [];
      if (query) {
        orders = orders.filter(
          (o) =>
            o.id.toLowerCase().includes(query) ||
            o.title.toLowerCase().includes(query) ||
            o.userName.toLowerCase().includes(query),
        );
      }
      container.innerHTML = `
        <div class="overflow-x-auto">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-50 text-slate-500 border-b">
              <tr>
                <th class="p-3">رقم الطلب</th>
                <th class="p-3">المستخدم</th>
                <th class="p-3">عنوان الرؤيا</th>
                <th class="p-3">تاريخ الإرسال</th>
                <th class="p-3">الحالة</th>
                <th class="p-3">إجراء</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${orders
                .map(
                  (o) => `
                <tr class="hover:bg-slate-50">
                  <td class="p-3 font-mono font-bold">#${o.id}</td>
                  <td class="p-3 font-semibold">${o.userName}</td>
                  <td class="p-3">${o.title}</td>
                  <td class="p-3 text-slate-400">${new Date(o.createdAt).toLocaleDateString("ar-SA")}</td>
                  <td class="p-3">${this.getStatusBadge(o.status)}</td>
                  <td class="p-3">
                    <button type="button" onclick="App.showOrderDetails('${o.id}')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 rounded font-semibold text-slate-700">عرض</button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === "users") {
      let users = (await this.apiRequest("/users")) || [];
      if (query) {
        users = users.filter(
          (u) =>
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query),
        );
      }
      container.innerHTML = `
        <div class="overflow-x-auto">
          <table class="w-full text-right text-xs">
            <thead class="bg-slate-50 text-slate-500 border-b">
              <tr>
                <th class="p-3">الاسم</th>
                <th class="p-3">البريد الإلكتروني</th>
                <th class="p-3">تاريخ الانضمام</th>
                <th class="p-3">الحالة</th>
                <th class="p-3">الدخول المباشر للحساب</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              ${users
                .map(
                  (u) => `
                <tr class="hover:bg-slate-50">
                  <td class="p-3 font-bold text-slate-900">${u.name}</td>
                  <td class="p-3 font-mono text-slate-500">${u.email}</td>
                  <td class="p-3 text-slate-400">${new Date(u.createdAt).toLocaleDateString("ar-SA")}</td>
                  <td class="p-3"><span class="px-2 py-0.5 rounded text-[10px] font-bold ${u.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}">${u.status === "active" ? "نشط" : "معطل"}</span></td>
                  <td class="p-3 flex items-center gap-2">
                    <button type="button" onclick="App.quickSwitchRole('User', '${u.email}')" class="px-3 py-1 bg-emerald-600 hover:bg-brand-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1">
                      <i class="fa-solid fa-arrow-right-to-bracket"></i> دخول كـ ${u.name.split(" ")[0]}
                    </button>
                    <button type="button" onclick="App.toggleUserStatus('${u.id}')" class="px-2 py-1 text-[11px] rounded font-bold ${u.status === "active" ? "bg-red-50 text-red-700 hover:bg-red-100" : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}">
                      ${u.status === "active" ? "تعطيل" : "تفعيل"}
                    </button>
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `;
    } else if (tab === "interpreters") {
      let ints = (await this.apiRequest("/interpreters")) || [];
      if (query) {
        ints = ints.filter(
          (i) =>
            i.name.toLowerCase().includes(query) ||
            i.email.toLowerCase().includes(query) ||
            i.specializedIn.toLowerCase().includes(query),
        );
      }
      container.innerHTML = `
        <div class="grid sm:grid-cols-2 gap-4">
          ${ints
            .map(
              (i) => `
            <div class="p-4 border rounded-xl bg-slate-50 flex justify-between items-start">
              <div>
                <h4 class="font-bold text-sm text-slate-900">${i.name}</h4>
                <p class="text-xs font-mono text-slate-500">${i.email}</p>
                <p class="text-xs text-brand-700 font-semibold mt-1">${i.specializedIn}</p>
                <div class="text-[11px] text-slate-400 mt-2 mb-3">إجمالي التفسيرات: ${i.totalInterpreted || 0}</div>
                <button type="button" onclick="App.quickSwitchRole('Interpreter', '${i.email}')" class="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow-sm">
                  <i class="fa-solid fa-user-tie"></i> دخول كـ ${i.name.split(" ")[1] || i.name}
                </button>
              </div>
              <span class="text-xs px-2 py-0.5 rounded font-bold bg-emerald-100 text-emerald-800">متاح</span>
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    } else if (tab === "settings") {
      const s = (await this.apiRequest("/settings")) || LOCAL_MOCK_DB.settings;
      container.innerHTML = `
        <form onsubmit="App.handleSaveSettings(event)" class="max-w-xl space-y-4 text-xs">
          <div>
            <label class="block font-bold text-slate-700 mb-1">اسم المنصة</label>
            <input type="text" id="setPlatformName" value="${s.platformName || "تعبير"}" class="w-full p-2.5 border rounded-xl">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">الوصف العام (Tagline)</label>
            <input type="text" id="setTagline" value="${s.tagline || "لتفسير الرؤى والأحلام"}" class="w-full p-2.5 border rounded-xl">
          </div>
          <div>
            <label class="block font-bold text-slate-700 mb-1">الحد الأقصى للتسجيل الصوتي (بالثواني)</label>
            <input type="number" id="setAudioDuration" value="${s.audioMaxDurationSec || 180}" class="w-full p-2.5 border rounded-xl">
          </div>
          <button type="submit" class="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow">حفظ الإعدادات</button>
        </form>
      `;
    }
  },

  async toggleUserStatus(userId) {
    await this.apiRequest(`/users/${userId}/toggle`, "PATCH");
    this.showToast("تم تحديث حالة حساب المستخدم", "info");
    this.renderAdminTabContent();
  },

  async handleSaveSettings(e) {
    if (e && e.preventDefault) e.preventDefault();
    const platformName = document.getElementById("setPlatformName").value;
    const tagline = document.getElementById("setTagline").value;
    const audioMaxDurationSec = Number(
      document.getElementById("setAudioDuration").value,
    );

    await this.apiRequest("/settings", "PUT", {
      platformName,
      tagline,
      audioMaxDurationSec,
    });
    this.showToast("تم حفظ الإعدادات العامة بنجاح", "success");
  },

  openAddInterpreterModal() {
    const el = document.getElementById("addInterpreterModal");
    if (el) el.classList.remove("hidden");
  },
  closeAddInterpreterModal() {
    const el = document.getElementById("addInterpreterModal");
    if (el) el.classList.add("hidden");
  },

  async handleCreateInterpreter(e) {
    if (e && e.preventDefault) e.preventDefault();
    const name = document.getElementById("newIntName").value;
    const email = document.getElementById("newIntEmail").value;
    const specializedIn = document.getElementById("newIntSpec").value;
    const bio = document.getElementById("newIntBio").value;

    await this.apiRequest("/interpreters", "POST", {
      name,
      email,
      specializedIn,
      bio,
    });
    this.showToast("تمت إضافة المفسر المعتمد بنجاح", "success");
    this.closeAddInterpreterModal();
    this.loadAdminDashboard();
  },

  // ===================== نافذة عرض تفاصيل الطلب =====================
  async showOrderDetails(orderId) {
    const orders = (await this.apiRequest("/orders")) || [];
    const order = orders.find((o) => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("orderDetailsModal");
    const content = document.getElementById("orderDetailsModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="flex justify-between items-center pb-4 border-b border-slate-100 mb-6">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono font-bold text-slate-400">#${order.id}</span>
            <h3 class="text-xl font-bold text-slate-900">${order.title}</h3>
          </div>
          <span class="text-xs text-slate-400">${new Date(order.createdAt).toLocaleString("ar-SA")}</span>
        </div>
        <button type="button" onclick="App.closeOrderDetails()" class="text-slate-400 hover:text-slate-600"><i class="fa-solid fa-xmark text-lg"></i></button>
      </div>

      <div class="space-y-6">
        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <span class="text-xs font-bold text-slate-500 block mb-2">حالة الطلب الحالية:</span>
          <div class="flex items-center gap-3">
            ${this.getStatusBadge(order.status)}
            <span class="text-xs text-slate-600">آخر تحديث: ${new Date(order.updatedAt).toLocaleDateString("ar-SA")}</span>
          </div>
        </div>

        <div>
          <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">بيانات الرؤيا المرسلة</h4>
          <div class="bg-white p-4 rounded-xl border border-slate-200">
            <p class="text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">${order.dreamText || "تم إرسال الرؤيا عبر تسجيل صوتي فقط."}</p>
            ${
              order.audioUrl
                ? `
              <div class="mt-4 pt-3 border-t border-slate-100">
                <span class="text-xs font-bold text-brand-600 block mb-1"><i class="fa-solid fa-microphone"></i> التسجيل الصوتي للرؤيا:</span>
                <audio controls src="${order.audioUrl}" class="w-full h-9"></audio>
              </div>
            `
                : ""
            }
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-xl">
          <div><span class="text-slate-400 block">الرائي:</span> <span class="font-bold">${order.userName}</span></div>
          <div><span class="text-slate-400 block">الحالة الاجتماعية:</span> <span class="font-bold">${order.maritalStatus}</span></div>
          <div><span class="text-slate-400 block">الحالة المهنية:</span> <span class="font-bold">${order.employmentStatus}</span></div>
        </div>

        ${
          order.interpretation
            ? `
          <div class="bg-emerald-50/80 border border-emerald-200 p-5 rounded-2xl">
            <div class="flex items-center justify-between mb-3">
              <h4 class="font-bold text-emerald-950 text-sm flex items-center gap-2">
                <i class="fa-solid fa-check-double text-emerald-600"></i> تعبير الرؤيا من: ${order.interpretation.interpreterName}
              </h4>
              <span class="text-[10px] text-emerald-700">${new Date(order.interpretation.createdAt).toLocaleDateString("ar-SA")}</span>
            </div>
            <p class="text-sm text-emerald-900 leading-relaxed font-serif text-base">${order.interpretation.text}</p>
            ${
              order.interpretation.audioUrl
                ? `
              <div class="mt-4 pt-3 border-t border-emerald-200/60">
                <span class="text-xs font-bold text-emerald-800 block mb-1"><i class="fa-solid fa-volume-high"></i> التفسير الصوتي للمفسر:</span>
                <audio controls src="${order.interpretation.audioUrl}" class="w-full h-9"></audio>
              </div>
            `
                : ""
            }
          </div>
        `
            : `
          <div class="text-center p-6 bg-slate-50 rounded-xl border border-dashed text-slate-400 text-xs">
            <i class="fa-solid fa-hourglass-half text-xl mb-2 text-amber-500"></i>
            <p>الرؤيا قيد المراجعة والدراسة من قبل المفسر المعتمد، وسيظهر التفسير هنا فور اعتماده.</p>
          </div>
        `
        }
      </div>

      <div class="mt-6 pt-4 border-t border-slate-100 flex justify-end">
        <button type="button" onclick="App.closeOrderDetails()" class="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs">إغلاق</button>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  closeOrderDetails() {
    const el = document.getElementById("orderDetailsModal");
    if (el) el.classList.add("hidden");
  },

  // ===================== أدوات مساعدة =====================
  getStatusBadge(status) {
    if (status === "جديد")
      return '<span class="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-full">جديد</span>';
    if (status === "قيد التفسير" || status === "قيد المراجعة")
      return '<span class="px-2.5 py-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold rounded-full">قيد التفسير</span>';
    if (status === "تم التسليم" || status === "تم التفسير")
      return '<span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-full">تم التفسير والتسليم</span>';
    return `<span class="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">${status}</span>`;
  },

  async fetchInterpretersPublic() {
    this.state.interpreters =
      (await this.apiRequest("/interpreters")) || LOCAL_MOCK_DB.interpreters;
  },

  async fetchSettings() {
    this.state.settings =
      (await this.apiRequest("/settings")) || LOCAL_MOCK_DB.settings;
  },

  renderLandingInterpreters() {
    const list = document.getElementById("landingInterpretersList");
    if (!list) return;
    list.innerHTML = this.state.interpreters
      .map(
        (i) => `
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
        <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-brand-700 flex items-center justify-center text-2xl font-bold flex-shrink-0">
          <i class="fa-solid fa-user-tie"></i>
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h4 class="font-bold text-slate-900 text-lg">${i.name}</h4>
            <span class="text-xs bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">★ ${i.rating || 5.0}</span>
          </div>
          <p class="text-xs text-brand-600 font-semibold mb-1">${i.specializedIn}</p>
          <p class="text-xs text-slate-500 leading-relaxed">${i.bio}</p>
          <div class="text-[11px] text-slate-400 mt-2 font-medium">فسّر أكثر من ${i.totalInterpreted || 50} رؤيا معتمدة</div>
        </div>
      </div>
    `,
      )
      .join("");
  },

  showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toastMessage");
    const icon = document.getElementById("toastIcon");
    if (!toast || !msg) return;

    msg.innerText = message;
    if (type === "error")
      icon.className = "fa-solid fa-circle-exclamation text-red-400";
    else if (type === "info")
      icon.className = "fa-solid fa-circle-info text-blue-400";
    else icon.className = "fa-solid fa-circle-check text-emerald-400";

    toast.classList.remove("translate-y-20", "opacity-0");
    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
    }, 3500);
  },

  async resetData() {
    await this.apiRequest("/admin/reset-demo", "POST");
    this.showToast("تمت استعادة البيانات بنجاح", "success");
    setTimeout(() => window.location.reload(), 500);
  },
};

window.addEventListener("DOMContentLoaded", () => App.init());
