/**
 * منطق التطبيق المتكامل - منصة رؤيا لتفسير الرؤى
 * يدعم الدخول برقم الجوال والرقم السري، نظام حجب التفسير حتى الدفع/إعفاء المدير، وإدارة الشكاوى والمقترحات
 */

const LOCAL_MOCK_DB = {
  observers: [
    {
      id: "obs_1",
      name: "أ. عبدالعزيز (المتابع والممول)",
      phone: "0500000004",
      password: "123",
      email: "observer@demo.com",
      role: "Observer",
      status: "active",
      organization: "شريك وممول استراتيجي",
    },
  ],
  admins: [
    {
      id: "adm_1",
      name: "المدير العام",
      phone: "0500000001",
      password: "123",
      email: "admin@demo.com",
      role: "Admin",
      status: "active",
    },
  ],
  interpreters: [
    {
      id: "int_1",
      name: "الشيخ أحمد المنصور",
      phone: "0500000002",
      password: "123",
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
      phone: "0500000003",
      password: "123",
      email: "saadi@demo.com",
      role: "Interpreter",
      status: "active",
      bio: "إجازات في التفسير والعلوم الشرعية وتأويل الرؤى",
      specializedIn: "الرؤى الرمزية المتكررة",
      totalInterpreted: 89,
      rating: 4.8,
    },
  ],
  users: [
    {
      id: "usr_1",
      name: "عمر الحربي",
      phone: "0501234567",
      password: "123",
      email: "user@demo.com",
      role: "User",
      status: "active",
      createdAt: "2026-08-10T10:00:00Z",
    },
    {
      id: "usr_2",
      name: "فاطمة الشهري",
      phone: "0559876543",
      password: "123",
      email: "fatima@demo.com",
      role: "User",
      status: "active",
      createdAt: "2026-08-12T14:30:00Z",
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
      status: "مكتمل",
      isPaid: true,
      adminUnlocked: false,
      assignedInterpreterId: "int_1",
      amount: 11.5,
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
      status: "مكتمل",
      isPaid: false,
      adminUnlocked: false,
      assignedInterpreterId: "int_1",
      amount: 11.5,
      createdAt: "2026-08-16T19:00:00Z",
      updatedAt: "2026-08-17T09:00:00Z",
      interpretation: {
        id: "INT-5002",
        interpreterId: "int_1",
        interpreterName: "الشيخ أحمد المنصور",
        text: "بسم الله الرحمن الرحيم. إهداء المتوفى في المنام خير ورزق وبركة، والخاتم الفضي المرصع بالياقوت بشارة بحدث سار واستقرار وسعة في العيش ورفعة قدر بإذن الله.",
        audioUrl: null,
        createdAt: "2026-08-17T09:00:00Z",
      },
    },
  ],
  complaints: [
    {
      id: "CMP-1",
      userId: "usr_1",
      userName: "عمر الحربي",
      type: "مقترح",
      subject: "إضافة خيار حفظ التفسير كملف PDF",
      text: "أقترح إضافة زر لتحميل نص التفسير كملف موثق للرجوع إليه دائماً.",
      status: "مغلقة",
      adminReply:
        "نشكرك على مقترحك القيم، تم رفع الملاحظة للفريق التقني وسيتم توفيرها قريباً.",
      createdAt: "2026-08-16T10:00:00Z",
      closedAt: "2026-08-16T15:00:00Z",
    },
  ],
  settings: {
    platformName: "رؤيا",
    pricePerOrder: 11.5,
    tagline: "تفسير الرؤى والأحلام بضوابط شرعية",
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
    settings: {},
    intActiveTab: "new",
    admActiveTab: "dashboard",
    obsActiveTab: "stats",
    adminSearchQuery: "",
    publicAudioBase64: null,
    publicMediaRecorder: null,
    publicAudioChunks: [],
    publicTimerInterval: null,
    publicSeconds: 0,
    isPublicRecording: false,
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

    // ضبط تاريخ اليوم تلقائياً
    const dateInput = document.getElementById("pubOrderDate");
    if (dateInput) dateInput.value = new Date().toISOString().split("T")[0];

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
    this.renderSidebar();
  },

  clearSession() {
    this.state.currentUser = null;
    this.state.currentRole = "Guest";
    this.state.token = null;
    localStorage.removeItem("ruya_user");
    localStorage.removeItem("ruya_role");
    localStorage.removeItem("ruya_token");
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
      if (res.ok) return await res.json();
      throw new Error("Local fallback");
    } catch (err) {
      return this.localFallbackHandler(endpoint, method, body);
    }
  },

  localFallbackHandler(endpoint, method, body) {
    if (endpoint === "/auth/login") {
      const { phone, password } = body;
      const cleanPhone = (phone || "").trim();

      // البحث برقم الجوال
      const obs = LOCAL_MOCK_DB.observers.find(
        (o) => o.phone === cleanPhone || o.email === cleanPhone,
      );
      if (obs) return { user: obs, role: "Observer", token: "token-obs" };

      const admin = LOCAL_MOCK_DB.admins.find(
        (a) => a.phone === cleanPhone || a.email === cleanPhone,
      );
      if (admin) return { user: admin, role: "Admin", token: "token-admin" };

      const interp = LOCAL_MOCK_DB.interpreters.find(
        (i) => i.phone === cleanPhone || i.email === cleanPhone,
      );
      if (interp)
        return { user: interp, role: "Interpreter", token: "token-int" };

      let user = LOCAL_MOCK_DB.users.find(
        (u) => u.phone === cleanPhone || u.email === cleanPhone,
      );
      if (user) return { user, role: "User", token: "token-user" };

      // تسجيل فوري إذا لم يكن موجوداً
      user = {
        id: `usr_${Date.now()}`,
        name: `مستخدم ${cleanPhone.slice(-4)}`,
        phone: cleanPhone,
        password: password || "123",
        role: "User",
        status: "active",
        createdAt: new Date().toISOString(),
      };
      LOCAL_MOCK_DB.users.push(user);
      return { user, role: "User", token: "token-user" };
    }

    if (endpoint === "/orders" && method === "GET") {
      let res = LOCAL_MOCK_DB.orders;
      if (this.state.currentRole === "User" && this.state.currentUser) {
        res = res.filter((o) => o.userId === this.state.currentUser.id);
      } else if (
        this.state.currentRole === "Interpreter" &&
        this.state.currentUser
      ) {
        res = res.filter(
          (o) =>
            !o.assignedInterpreterId ||
            o.assignedInterpreterId === this.state.currentUser.id,
        );
      }
      return res;
    }

    if (endpoint === "/admin/stats") {
      const totalRev =
        LOCAL_MOCK_DB.orders.filter((o) => o.isPaid).length * 11.5;
      return {
        totalUsers: LOCAL_MOCK_DB.users.length,
        totalInterpreters: LOCAL_MOCK_DB.interpreters.length,
        totalOrders: LOCAL_MOCK_DB.orders.length,
        newOrders: LOCAL_MOCK_DB.orders.filter((o) => o.status === "جديد")
          .length,
        completedOrders: LOCAL_MOCK_DB.orders.filter(
          (o) => o.status === "مكتمل",
        ).length,
        inProgressOrders: LOCAL_MOCK_DB.orders.filter(
          (o) => o.status === "قيد التفسير",
        ).length,
        totalRevenue: totalRev,
        pendingRevenue: LOCAL_MOCK_DB.orders.length * 11.5 - totalRev,
      };
    }

    if (endpoint === "/users") return LOCAL_MOCK_DB.users;
    if (endpoint === "/interpreters") return LOCAL_MOCK_DB.interpreters;
    if (endpoint === "/settings") return LOCAL_MOCK_DB.settings;

    return {};
  },

  // التنقل والتحكم الكامل في ظهور وإخفاء الشريط العلوي والواجهة العامة
  navigate(viewName) {
    this.state.currentView = viewName;
    const isLanding = viewName === "landing";

    // إخفاء الشريط التجريبي والهيدر العام في اللوحات
    const demoBar = document.getElementById("demoTopBar");
    const pubHeader = document.getElementById("publicHeader");
    const pubFooter = document.getElementById("publicFooter");
    const mobileHeader = document.getElementById("mobileDashboardHeader");
    const landingEl = document.getElementById("viewLanding");
    const dashWrapper = document.getElementById("dashboardWrapper");

    if (demoBar) demoBar.style.display = isLanding ? "block" : "none";
    if (pubHeader) pubHeader.style.display = isLanding ? "block" : "none";
    if (pubFooter) pubFooter.style.display = isLanding ? "block" : "none";
    if (mobileHeader) mobileHeader.style.display = isLanding ? "none" : "flex";

    document
      .querySelectorAll(".view-section")
      .forEach((el) => el.classList.add("hidden"));

    if (isLanding) {
      if (landingEl) landingEl.classList.remove("hidden");
      if (dashWrapper) dashWrapper.classList.add("hidden");
    } else {
      if (landingEl) landingEl.classList.add("hidden");
      if (dashWrapper) dashWrapper.classList.remove("hidden");

      if (viewName === "newOrder") {
        if (!this.state.currentUser) return this.openLoginModal();
        document.getElementById("viewNewOrder")?.classList.remove("hidden");
        this.resetNewOrderForm();
      } else if (viewName === "userDashboard") {
        document
          .getElementById("viewUserDashboard")
          ?.classList.remove("hidden");
        this.loadUserDashboard();
      } else if (viewName === "interpreterDashboard") {
        document
          .getElementById("viewInterpreterDashboard")
          ?.classList.remove("hidden");
        this.loadInterpreterDashboard();
      } else if (viewName === "adminDashboard") {
        document
          .getElementById("viewAdminDashboard")
          ?.classList.remove("hidden");
        this.loadAdminDashboard();
      } else if (viewName === "observerDashboard") {
        document
          .getElementById("viewObserverDashboard")
          ?.classList.remove("hidden");
        this.loadObserverDashboard();
      }
      this.renderSidebar();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  routeByRole(role) {
    if (role === "Admin") this.navigate("adminDashboard");
    else if (role === "Interpreter") this.navigate("interpreterDashboard");
    else if (role === "Observer") this.navigate("observerDashboard");
    else this.navigate("userDashboard");
  },

  toggleMobileDrawer() {
    const sidebar = document.getElementById("sidebarContainer");
    if (sidebar) {
      sidebar.classList.toggle("hidden");
    }
  },

  // بناء القائمة الجانبية في اليمين بدون رابط للواجهة العامة
  renderSidebar() {
    const card = document.getElementById("sidebarUserCard");
    const nav = document.getElementById("sidebarNavLinks");
    const roleBadge = document.getElementById("sidebarRoleBadge");
    if (!card || !nav) return;

    if (!this.state.currentUser) return;

    const roleLabels = {
      Admin: "المدير العام",
      Interpreter: "مفسر معتمد",
      User: "صاحب رؤيا",
      Observer: "المتابع والممول",
    };

    if (roleBadge)
      roleBadge.innerText = roleLabels[this.state.currentRole] || "لوحة التحكم";

    card.innerHTML = `
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-lg bg-brand-primary text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
          ${this.state.currentUser.name.charAt(0)}
        </div>
        <div class="min-w-0 flex-grow">
          <div class="text-xs font-bold text-brand-primary truncate">${this.state.currentUser.name}</div>
          <span class="text-[10px] text-brand-muted block truncate">${this.state.currentUser.phone || this.state.currentUser.email}</span>
        </div>
      </div>
    `;

    // قائمة المستخدم
    if (this.state.currentRole === "User") {
      nav.innerHTML = `
        <button type="button" onclick="App.navigate('userDashboard')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.currentView === "userDashboard" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-list-check text-xs"></i> طلباتي وحالاتها</button>
        <button type="button" onclick="App.navigate('newOrder')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.currentView === "newOrder" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-plus text-xs"></i> إرسال رؤيا جديدة</button>
        <button type="button" onclick="App.openAddComplaintModal()" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium text-brand-text hover:bg-brand-bg"><i class="fa-regular fa-comment-dots text-xs"></i> الشكاوى والمقترحات</button>
      `;
    }
    // قائمة المفسر
    else if (this.state.currentRole === "Interpreter") {
      nav.innerHTML = `
        <button type="button" onclick="App.navigate('interpreterDashboard'); App.setIntTab('new')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.intActiveTab === "new" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-inbox text-xs"></i> الطلبات الجديدة</button>
        <button type="button" onclick="App.navigate('interpreterDashboard'); App.setIntTab('in_progress')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.intActiveTab === "in_progress" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-hourglass-half text-xs"></i> قيد التفسير</button>
        <button type="button" onclick="App.navigate('interpreterDashboard'); App.setIntTab('completed')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.intActiveTab === "completed" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-check-double text-xs"></i> السجل المكتمل</button>
      `;
    }
    // قائمة المدير العام الشاملة
    else if (this.state.currentRole === "Admin") {
      const active = this.state.admActiveTab;
      nav.innerHTML = `
        <button type="button" onclick="App.setAdminTab('dashboard')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "dashboard" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-chart-pie text-xs"></i> لوحة التحكم</button>
        <button type="button" onclick="App.setAdminTab('orders')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "orders" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-list-check text-xs"></i> إدارة الطلبات</button>
        <button type="button" onclick="App.setAdminTab('users')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "users" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-users text-xs"></i> المستخدمون</button>
        <button type="button" onclick="App.setAdminTab('interpreters')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "interpreters" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-user-tie text-xs"></i> المفسرون</button>
        <button type="button" onclick="App.setAdminTab('finance')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "finance" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-coins text-xs text-brand-accent"></i> متابعة المبالغ والمالية</button>
        <button type="button" onclick="App.setAdminTab('reports')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "reports" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-chart-line text-xs"></i> التقارير والإحصائيات</button>
        <button type="button" onclick="App.setAdminTab('complaints')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "complaints" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-regular fa-comments text-xs"></i> الشكاوى والمقترحات</button>
        <button type="button" onclick="App.setAdminTab('settings')" class="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium ${active === "settings" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-sliders text-xs"></i> إعدادات النظام</button>
      `;
    }
    // قائمة المتابع والممول
    else if (this.state.currentRole === "Observer") {
      nav.innerHTML = `
        <button type="button" onclick="App.setObsTab('stats')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.obsActiveTab === "stats" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-chart-pie text-xs"></i> نظرة عامة ومؤشرات</button>
        <button type="button" onclick="App.setObsTab('all_orders')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.obsActiveTab === "all_orders" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-list-check text-xs"></i> متابعة الطلبات</button>
        <button type="button" onclick="App.setObsTab('interpreters')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.obsActiveTab === "interpreters" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-user-tie text-xs"></i> أداء المفسرين</button>
        <button type="button" onclick="App.setObsTab('finance')" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium ${this.state.obsActiveTab === "finance" ? "bg-brand-primary text-white font-bold" : "text-brand-text hover:bg-brand-bg"}"><i class="fa-solid fa-coins text-xs text-brand-accent"></i> التدفق المالي</button>
      `;
    }
  },

  // ===================== التسجيل والإرسال المباشر من الواجهة =====================
  async togglePublicRecording() {
    const btn = document.getElementById("pubRecordBtn");
    const icon = document.getElementById("pubRecordIcon");
    const timer = document.getElementById("pubRecordingTimer");
    const statusText = document.getElementById("pubRecordStatusText");

    if (!this.state.isPublicRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        this.state.publicMediaRecorder = new MediaRecorder(stream);
        this.state.publicAudioChunks = [];

        this.state.publicMediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) this.state.publicAudioChunks.push(e.data);
        };

        this.state.publicMediaRecorder.onstop = () => {
          const blob = new Blob(this.state.publicAudioChunks, {
            type: "audio/webm",
          });
          const preview = document.getElementById("pubAudioPreview");
          if (preview) preview.src = URL.createObjectURL(blob);
          document
            .getElementById("pubAudioPreviewContainer")
            ?.classList.remove("hidden");

          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            this.state.publicAudioBase64 = reader.result;
          };
        };

        this.state.publicMediaRecorder.start();
        this.state.isPublicRecording = true;
        this.state.publicSeconds = 0;
        if (timer) timer.classList.remove("hidden");
        if (btn) btn.classList.add("recording-pulse");
        if (icon) icon.className = "fa-solid fa-stop text-white";
        if (statusText)
          statusText.innerText = "جاري تسجيل رؤيتك... اضغط للإيقاف";

        this.state.publicTimerInterval = setInterval(() => {
          this.state.publicSeconds++;
          const mins = String(
            Math.floor(this.state.publicSeconds / 60),
          ).padStart(2, "0");
          const secs = String(this.state.publicSeconds % 60).padStart(2, "0");
          if (timer) timer.innerText = `${mins}:${secs}`;
          if (this.state.publicSeconds >= 180) App.togglePublicRecording();
        }, 1000);
      } catch (err) {
        this.showToast("يرجى السماح بالوصول للميكروفون", "error");
      }
    } else {
      if (
        this.state.publicMediaRecorder &&
        this.state.publicMediaRecorder.state !== "inactive"
      ) {
        this.state.publicMediaRecorder.stop();
        this.state.publicMediaRecorder.stream
          .getTracks()
          .forEach((t) => t.stop());
      }
      clearInterval(this.state.publicTimerInterval);
      this.state.isPublicRecording = false;
      if (btn) btn.classList.remove("recording-pulse");
      if (icon) icon.className = "fa-solid fa-microphone text-brand-accent";
      if (statusText) statusText.innerText = "تم حفظ التسجيل الصوتي بنجاح";
    }
  },

  removePublicRecording() {
    this.state.publicAudioBase64 = null;
    document
      .getElementById("pubAudioPreviewContainer")
      ?.classList.add("hidden");
    document.getElementById("pubRecordingTimer")?.classList.add("hidden");
    const statusText = document.getElementById("pubRecordStatusText");
    if (statusText) statusText.innerText = "اضغط على الميكروفون لبدء التسجيل";
  },

  async handlePublicDreamSubmit(e) {
    if (e && e.preventDefault) e.preventDefault();
    const title = document.getElementById("pubOrderTitle").value;
    const dreamText = document.getElementById("pubOrderDreamText").value;
    const dreamDate = document.getElementById("pubOrderDate").value;
    const maritalStatus = document.getElementById("pubOrderMarital").value;
    const employmentStatus =
      document.getElementById("pubOrderEmployment").value;
    const name = document.getElementById("regUserName").value;
    const phone = document.getElementById("regUserPhone").value;
    const password = document.getElementById("regUserPass").value;
    const email = document.getElementById("regUserEmail").value;
    const audioUrl = this.state.publicAudioBase64;
    const btn = document.getElementById("btnSubmitPubDream");

    if (!dreamText && !audioUrl) {
      return this.showToast("يرجى كتابة نص الرؤيا أو تسجيلها صوتياً", "error");
    }

    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin text-xs"></i> جاري إرسال الرؤيا وتجهيز الحساب...`;
    }

    // 1. تسجيل / مطابقة المستخدم
    let user = LOCAL_MOCK_DB.users.find((u) => u.phone === phone);
    if (!user) {
      user = {
        id: `usr_${Date.now()}`,
        name,
        phone,
        password,
        email: email || `${phone}@ruya.app`,
        role: "User",
        status: "active",
        createdAt: new Date().toISOString(),
      };
      LOCAL_MOCK_DB.users.push(user);
    }

    // 2. إنشاء الطلب
    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user.id,
      userName: user.name,
      title,
      dreamText: dreamText || "",
      audioUrl: audioUrl || null,
      dreamDate: dreamDate || new Date().toISOString().split("T")[0],
      maritalStatus,
      employmentStatus,
      status: "جديد",
      isPaid: false,
      adminUnlocked: false,
      assignedInterpreterId: null,
      amount: 11.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interpretation: null,
    };
    LOCAL_MOCK_DB.orders.unshift(newOrder);

    // 3. الدخول التلقائي لحساب المستخدم وعرض لوحة طلباته
    this.setSession(user, "User", "token-user");
    this.showToast("تم إرسال رؤيتك بنجاح للمفسر وتم إنشاء حسابك", "success");
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = `<span>إرسال الرؤيا للمفسر</span> <i class="fa-solid fa-arrow-left text-xs"></i>`;
    }
    this.navigate("userDashboard");
  },

  // ===================== تسجيل الدخول العادي =====================
  async handleLogin(e) {
    if (e && e.preventDefault) e.preventDefault();
    const phone = document.getElementById("loginPhone").value;
    const password = document.getElementById("loginPass").value;

    const res = await this.apiRequest("/auth/login", "POST", {
      phone,
      password,
    });
    if (res && res.user) {
      this.setSession(res.user, res.role, res.token);
      this.closeLoginModal();
      this.showToast(`مرحباً بك: ${res.user.name}`, "success");
      this.routeByRole(res.role);
    }
  },

  async quickSwitchRole(role, phone) {
    const res = await this.apiRequest("/auth/login", "POST", {
      phone,
      password: "123",
    });
    if (res && res.user) {
      this.setSession(res.user, res.role, res.token);
      this.showToast(`تم الدخول بحساب: ${res.user.name}`, "info");
      this.routeByRole(role);
    }
  },

  openLoginModal() {
    document.getElementById("loginModal")?.classList.remove("hidden");
  },
  closeLoginModal() {
    document.getElementById("loginModal")?.classList.add("hidden");
  },

  // ===================== إرسال رؤيا جديدة من داخل الحساب =====================
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
          document
            .getElementById("audioPreviewContainer")
            ?.classList.remove("hidden");

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
        if (btn) btn.classList.add("recording-pulse");
        if (icon) icon.className = "fa-solid fa-stop text-white";
        if (statusText) statusText.innerText = "جاري التسجيل... اضغط للإيقاف";

        rec.timerInterval = setInterval(() => {
          rec.seconds++;
          const mins = String(Math.floor(rec.seconds / 60)).padStart(2, "0");
          const secs = String(rec.seconds % 60).padStart(2, "0");
          if (timerEl) timerEl.innerText = `${mins}:${secs}`;
          if (rec.seconds >= 180) App.toggleRecording();
        }, 1000);
      } catch (err) {
        this.showToast("تعذر الوصول إلى الميكروفون", "error");
      }
    } else {
      if (rec.mediaRecorder && rec.mediaRecorder.state !== "inactive") {
        rec.mediaRecorder.stop();
        rec.mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      }
      clearInterval(rec.timerInterval);
      rec.isRecording = false;
      if (btn) btn.classList.remove("recording-pulse");
      if (icon) icon.className = "fa-solid fa-microphone text-brand-accent";
      if (statusText) statusText.innerText = "تم حفظ التسجيل الصوتي بنجاح";
    }
  },

  removeRecording() {
    this.state.audioRecorder.audioBlob = null;
    this.state.audioRecorder.audioBase64 = null;
    document.getElementById("audioPreviewContainer")?.classList.add("hidden");
    document.getElementById("recordingTimer")?.classList.add("hidden");
    const statusText = document.getElementById("recordStatusText");
    if (statusText) statusText.innerText = "اضغط على الميكروفون لبدء التسجيل";
  },

  resetNewOrderForm() {
    document.getElementById("newOrderForm")?.reset();
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

    if (!dreamText && !audioUrl)
      return this.showToast("يرجى كتابة نص الرؤيا أو تسجيلها صوتياً", "error");

    const newOrder = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: this.state.currentUser.id,
      userName: this.state.currentUser.name,
      title,
      dreamText: dreamText || "",
      audioUrl: audioUrl || null,
      dreamDate: dreamDate || new Date().toISOString().split("T")[0],
      maritalStatus,
      employmentStatus,
      status: "جديد",
      isPaid: false,
      adminUnlocked: false,
      assignedInterpreterId: null,
      amount: 11.5,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      interpretation: null,
    };
    LOCAL_MOCK_DB.orders.unshift(newOrder);

    this.showToast("تم إرسال رؤيتك بنجاح للمفسر", "success");
    this.navigate("userDashboard");
  },

  // ===================== لوحة المستخدم =====================
  async loadUserDashboard() {
    const orders = await this.apiRequest("/orders");
    this.state.orders = orders || [];

    const heading = document.getElementById("userWelcomeHeading");
    if (heading && this.state.currentUser) {
      heading.innerText = `مرحباً بك، ${this.state.currentUser.name}`;
    }

    const list = document.getElementById("userOrdersList");
    if (!list) return;

    if (this.state.orders.length === 0) {
      list.innerHTML = `
        <div class="bg-white border border-brand-border rounded-2xl p-10 text-center space-y-3">
          <div class="w-12 h-12 bg-brand-bg rounded-xl flex items-center justify-center text-brand-muted text-xl mx-auto">
            <i class="fa-solid fa-feather"></i>
          </div>
          <h5 class="text-sm font-bold text-brand-primary">لا توجد رؤى سابقة حتى الآن</h5>
          <p class="text-xs text-brand-muted max-w-xs mx-auto">أرسل رؤيتك الأولى وابدأ تجربتك مع مفسر موثوق.</p>
          <button type="button" onclick="App.navigate('newOrder')" class="px-5 py-2 bg-brand-primary text-white text-xs font-medium rounded-xl shadow-sm">إرسال رؤيا</button>
        </div>
      `;
      return;
    }

    list.innerHTML = this.state.orders
      .map(
        (order) => `
      <div class="bg-white border border-brand-border rounded-xl p-4.5 hover:border-brand-borderHover transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-subtle cursor-pointer" onclick="App.showOrderDetails('${order.id}')">
        <div class="space-y-1">
          <div class="flex items-center gap-2">
            <span class="text-[11px] font-mono text-brand-muted">#${order.id}</span>
            <h5 class="font-bold text-brand-primary text-xs">${order.title}</h5>
            ${order.audioUrl ? '<span class="text-[10px] text-brand-primary bg-brand-bg px-2 py-0.5 rounded-md border border-brand-border"><i class="fa-solid fa-microphone text-[9px] text-brand-accent"></i> صوتي</span>' : ""}
          </div>
          <p class="text-xs text-brand-muted line-clamp-1">${order.dreamText || "تسجيل صوتي فقط"}</p>
          <div class="text-[10px] text-brand-muted flex items-center gap-3 pt-0.5">
            <span>تاريخ الرؤيا: ${order.dreamDate}</span>
            <span>تاريخ الإرسال: ${new Date(order.createdAt).toLocaleDateString("ar-SA")}</span>
          </div>
        </div>
        <div class="flex items-center justify-between sm:justify-end gap-2.5">
          ${this.getStatusBadge(order.status)}
          <button type="button" class="px-3 py-1 bg-white hover:bg-brand-bg border border-brand-border text-brand-text rounded-lg text-xs font-medium transition">
            عرض الحالة والتفسير
          </button>
        </div>
      </div>
    `,
      )
      .join("");
  },

  // ===================== لوحة المفسر =====================
  async loadInterpreterDashboard() {
    const orders = await this.apiRequest("/orders");
    this.state.orders = orders || [];

    const newCount = this.state.orders.filter(
      (o) => o.status === "جديد",
    ).length;
    const progCount = this.state.orders.filter(
      (o) => o.status === "قيد التفسير" || o.status === "قيد المراجعة",
    ).length;
    const compCount = this.state.orders.filter(
      (o) => o.status === "مكتمل" || o.status === "تم التفسير",
    ).length;

    const bNew = document.getElementById("intBadgeNew");
    if (bNew) bNew.innerText = newCount;
    const bProg = document.getElementById("intBadgeProgress");
    if (bProg) bProg.innerText = progCount;
    const bComp = document.getElementById("intBadgeCompleted");
    if (bComp) bComp.innerText = compCount;

    this.renderInterpreterTabContent();
  },

  setIntTab(tab) {
    this.state.intActiveTab = tab;
    this.renderSidebar();
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
        (o) => o.status === "مكتمل" || o.status === "تم التفسير",
      );

    const tabNew = document.getElementById("tabIntNew");
    const tabProg = document.getElementById("tabIntProgress");
    const tabComp = document.getElementById("tabIntCompleted");

    if (tabNew)
      tabNew.className =
        this.state.intActiveTab === "new"
          ? "pb-2 text-brand-primary border-b-2 border-brand-primary font-bold"
          : "pb-2 text-brand-muted hover:text-brand-primary font-medium";
    if (tabProg)
      tabProg.className =
        this.state.intActiveTab === "in_progress"
          ? "pb-2 text-brand-primary border-b-2 border-brand-primary font-bold"
          : "pb-2 text-brand-muted hover:text-brand-primary font-medium";
    if (tabComp)
      tabComp.className =
        this.state.intActiveTab === "completed"
          ? "pb-2 text-brand-primary border-b-2 border-brand-primary font-bold"
          : "pb-2 text-brand-muted hover:text-brand-primary font-medium";

    if (filtered.length === 0) {
      list.innerHTML = `<div class="p-8 text-center text-brand-muted text-xs">لا توجد طلبات في هذا القسم حالياً.</div>`;
      return;
    }

    list.innerHTML = `
      <div class="divide-y divide-brand-border">
        ${filtered
          .map(
            (order) => `
          <div class="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-brand-bg/40 transition">
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-mono text-brand-muted">#${order.id}</span>
                <h5 class="font-bold text-brand-primary text-xs">${order.title}</h5>
                <span class="text-[10px] px-2 py-0.5 rounded bg-brand-bg font-medium border border-brand-border">${order.userName}</span>
                ${order.audioUrl ? '<span class="text-[10px] text-brand-primary bg-brand-bg px-2 py-0.5 rounded-md border border-brand-border"><i class="fa-solid fa-microphone text-[9px] text-brand-accent"></i> صوتي</span>' : ""}
              </div>
              <p class="text-xs text-brand-muted line-clamp-1">${order.dreamText || "استمع للتسجيل الصوتي"}</p>
              <div class="text-[10px] text-brand-muted flex gap-4">
                <span>الحالة: ${order.maritalStatus} / ${order.employmentStatus}</span>
                <span>تاريخ الرؤيا: ${order.dreamDate}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0">
              ${
                order.status === "جديد"
                  ? `<button type="button" onclick="App.startInterpreting('${order.id}')" class="px-4 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-xl text-xs font-medium shadow-sm transition">فتح وبدء التفسير</button>`
                  : `<button type="button" onclick="App.openInterpretStudioModal('${order.id}')" class="px-4 py-2 bg-brand-accent hover:bg-brand-accent/90 text-brand-primary rounded-xl text-xs font-bold transition">${order.status === "مكتمل" ? "تعديل التفسير" : "كتابة / تسجيل التفسير"}</button>`
              }
              <button type="button" onclick="App.showOrderDetails('${order.id}')" class="px-3 py-2 bg-white hover:bg-brand-bg border border-brand-border text-brand-text rounded-xl text-xs font-medium transition">التفاصيل</button>
            </div>
          </div>
        `,
          )
          .join("")}
      </div>
    `;
  },

  async startInterpreting(orderId) {
    const order = LOCAL_MOCK_DB.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = "قيد التفسير";
      order.assignedInterpreterId = this.state.currentUser.id;
    }
    this.showToast("تم فتح الطلب للبدء في التفسير", "success");
    await this.loadInterpreterDashboard();
    this.openInterpretStudioModal(orderId);
  },

  // ===================== استوديو المفسر =====================
  openInterpretStudioModal(orderId) {
    const order = LOCAL_MOCK_DB.orders.find((o) => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("interpretActionModal");
    const content = document.getElementById("interpretActionModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="flex justify-between items-center pb-3.5 border-b border-brand-border mb-4">
        <div>
          <h4 class="text-sm font-bold text-brand-primary font-display">تفسير الرؤيا: ${order.title}</h4>
          <span class="text-[11px] text-brand-muted">الرائي: ${order.userName} (${order.maritalStatus} - ${order.employmentStatus})</span>
        </div>
        <button type="button" onclick="App.closeInterpretStudioModal()" class="text-brand-muted hover:text-brand-text"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="bg-brand-bg p-4 rounded-xl mb-4 border border-brand-border text-xs space-y-2">
        <span class="font-bold text-brand-primary block">الرؤيا:</span>
        <p class="text-brand-text leading-relaxed whitespace-pre-wrap">${order.dreamText || "لا يوجد نص مكتوب - استمع للتسجيل الصوتي"}</p>
        ${
          order.audioUrl
            ? `
          <div class="pt-2">
            <span class="text-[10px] font-bold text-brand-muted block mb-1">التسجيل الصوتي للرائي:</span>
            <audio controls src="${order.audioUrl}" class="w-full h-8"></audio>
          </div>
        `
            : ""
        }
      </div>

      <form onsubmit="App.handleSubmitInterpretation(event, '${order.id}')" class="space-y-4">
        <div>
          <label class="block text-xs font-bold text-brand-primary mb-1">كتابة التفسير *</label>
          <textarea id="interpText" rows="4" required placeholder="اكتب التفسير الوافي هنا..." class="w-full p-3 border border-brand-border rounded-xl text-xs focus:border-brand-primary outline-none transition">${order.interpretation ? order.interpretation.text : ""}</textarea>
        </div>

        <div class="bg-brand-bg border border-brand-border p-3.5 rounded-xl text-center space-y-2">
          <label class="block text-xs font-bold text-brand-primary">تسجيل التفسير صوتياً (اختياري)</label>
          <div class="flex items-center justify-center gap-2">
            <button type="button" id="interpRecBtn" onclick="App.toggleInterpRecording()" class="px-4 py-2 bg-brand-primary text-white rounded-xl text-xs font-medium flex items-center gap-1.5 transition">
              <i class="fa-solid fa-microphone text-brand-accent" id="interpRecIcon"></i>
              <span id="interpRecText">بدء تسجيل التفسير</span>
            </button>
            <span id="interpRecTimer" class="text-xs font-mono font-bold text-brand-primary hidden">00:00</span>
          </div>
          <div id="interpAudioPreviewContainer" class="${order.interpretation && order.interpretation.audioUrl ? "" : "hidden"} mt-2">
            <audio id="interpAudioPreview" controls src="${order.interpretation ? order.interpretation.audioUrl || "" : ""}" class="w-full h-8"></audio>
          </div>
        </div>

        <div class="pt-2 flex justify-end gap-2">
          <button type="button" onclick="App.closeInterpretStudioModal()" class="px-4 py-2 border border-brand-border text-brand-text rounded-xl text-xs font-medium">إلغاء</button>
          <button type="submit" class="px-6 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white font-medium rounded-xl text-xs shadow-sm">اعتماد وإرسال التفسير</button>
        </div>
      </form>
    `;

    modal.classList.remove("hidden");
  },

  closeInterpretStudioModal() {
    document.getElementById("interpretActionModal")?.classList.add("hidden");
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
          document
            .getElementById("interpAudioPreviewContainer")
            ?.classList.remove("hidden");
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
        if (btn) btn.classList.add("bg-red-600");
        if (icon) icon.className = "fa-solid fa-stop text-white";
        if (text) text.innerText = "إيقاف التسجيل";
        rec.timerInterval = setInterval(() => {
          rec.seconds++;
          const mins = String(Math.floor(rec.seconds / 60)).padStart(2, "0");
          const secs = String(rec.seconds % 60).padStart(2, "0");
          if (timer) timer.innerText = `${mins}:${secs}`;
          if (rec.seconds >= 180) App.toggleInterpRecording();
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
      if (btn) btn.classList.remove("bg-red-600");
      if (icon) icon.className = "fa-solid fa-microphone text-brand-accent";
      if (text) text.innerText = "إعادة التسجيل";
    }
  },

  async handleSubmitInterpretation(e, orderId) {
    if (e && e.preventDefault) e.preventDefault();
    const text = document.getElementById("interpText").value;
    const audioUrl = this.state.interpAudioRecorder.audioBase64;

    const order = LOCAL_MOCK_DB.orders.find((o) => o.id === orderId);
    if (order) {
      order.status = "مكتمل";
      order.interpretation = {
        id: `INT-${Date.now()}`,
        interpreterId: this.state.currentUser.id,
        interpreterName: this.state.currentUser.name,
        text,
        audioUrl,
        createdAt: new Date().toISOString(),
      };
    }
    this.showToast("تم اعتماد وإرسال التفسير بنجاح", "success");
    this.closeInterpretStudioModal();
    await this.loadInterpreterDashboard();
  },

  // ===================== لوحة المدير العام الموسعة =====================
  async loadAdminDashboard() {
    this.renderAdminTabContent();
  },

  setAdminTab(tab) {
    this.state.admActiveTab = tab;
    this.renderSidebar();
    this.renderAdminTabContent();
  },

  handleAdminSearch(val) {
    this.state.adminSearchQuery = (val || "").trim().toLowerCase();
    this.renderAdminTabContent();
  },

  async renderAdminTabContent() {
    const container = document.getElementById("adminTabContent");
    const kpi = document.getElementById("adminKpis");
    const title = document.getElementById("adminHeaderTitle");
    const subtitle = document.getElementById("adminHeaderSubtitle");
    const actions = document.getElementById("adminActionButtons");
    if (!container) return;

    const tab = this.state.admActiveTab;
    const stats = await this.apiRequest("/admin/stats");
    const orders = LOCAL_MOCK_DB.orders;
    const users = LOCAL_MOCK_DB.users;
    const interpreters = LOCAL_MOCK_DB.interpreters;
    const complaints = LOCAL_MOCK_DB.complaints;
    const query = this.state.adminSearchQuery;

    if (kpi) {
      if (tab === "dashboard" || tab === "reports" || tab === "finance") {
        kpi.classList.remove("hidden");
        kpi.innerHTML = `
          <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">المستخدمون</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.totalUsers || 2}</h4></div>
          <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">المفسرون</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.totalInterpreters || 2}</h4></div>
          <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">إجمالي الطلبات</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.totalOrders || 3}</h4></div>
          <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">طلبات جديدة</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.newOrders || 1}</h4></div>
          <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">قيد التفسير</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.inProgressOrders || 1}</h4></div>
          <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">مكتملة</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.completedOrders || 1}</h4></div>
        `;
      } else {
        kpi.classList.add("hidden");
      }
    }

    if (actions) actions.innerHTML = "";

    // 1. نظرة عامة
    if (tab === "dashboard") {
      if (title) title.innerText = "لوحة التحكم الرئيسية";
      if (subtitle)
        subtitle.innerText = "نظرة عامة على نشاط المنصة وحالات الطلبات الحالية";

      container.innerHTML = `
        <div class="space-y-5">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-brand-primary font-display">آخر الطلبات الواردة</h4>
            <button type="button" onclick="App.setAdminTab('orders')" class="text-[11px] text-brand-primary font-bold hover:underline">عرض كافة الطلبات ←</button>
          </div>
          <div class="overflow-x-auto"><table class="w-full text-right text-xs">
            <thead class="bg-brand-bg text-brand-muted border-b border-brand-border"><tr><th class="p-2.5">رقم الطلب</th><th class="p-2.5">المستخدم</th><th class="p-2.5">عنوان الرؤيا</th><th class="p-2.5">الحالة</th><th class="p-2.5">الدفع/الإعفاء</th><th class="p-2.5">إجراء</th></tr></thead>
            <tbody class="divide-y divide-brand-border">
              ${orders
                .slice(0, 5)
                .map(
                  (o) => `
                <tr class="hover:bg-brand-bg/40">
                  <td class="p-2.5 font-mono text-brand-muted">#${o.id}</td>
                  <td class="p-2.5 font-medium text-brand-primary">${o.userName}</td>
                  <td class="p-2.5">${o.title}</td>
                  <td class="p-2.5">${this.getStatusBadge(o.status)}</td>
                  <td class="p-2.5">${o.isPaid ? '<span class="text-emerald-700 font-bold">مسدد</span>' : o.adminUnlocked ? '<span class="text-brand-primary font-bold">معفى من المدير</span>' : '<span class="text-amber-700 font-bold">بانتظار السداد</span>'}</td>
                  <td class="p-2.5"><button type="button" onclick="App.showOrderDetails('${o.id}')" class="px-2.5 py-1 bg-white border border-brand-border rounded-lg text-brand-text font-medium text-[11px]">عرض</button></td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table></div>
        </div>
      `;
    }
    // 2. إدارة الطلبات والتدخل الإداري
    else if (tab === "orders") {
      if (title) title.innerText = "إدارة الطلبات والرؤى";
      if (subtitle)
        subtitle.innerText =
          "متابعة وإدارة كل الطلبات والتدخل الإداري وإعفاء الرسوم";

      let filteredOrders = orders;
      if (query)
        filteredOrders = filteredOrders.filter(
          (o) =>
            o.id.toLowerCase().includes(query) ||
            o.title.toLowerCase().includes(query) ||
            o.userName.toLowerCase().includes(query),
        );

      container.innerHTML = `
        <div class="space-y-4">
          <div class="flex items-center justify-between gap-3">
            <input type="text" id="adminSearchInput" oninput="App.handleAdminSearch(this.value)" value="${this.state.adminSearchQuery}" placeholder="بحث برقم الطلب أو اسم الرائي..." class="px-3.5 py-2 rounded-xl border border-brand-border text-xs outline-none focus:border-brand-primary w-full max-w-sm" />
          </div>
          <div class="overflow-x-auto"><table class="w-full text-right text-xs">
            <thead class="bg-brand-bg text-brand-muted border-b border-brand-border"><tr><th class="p-2.5">رقم الطلب</th><th class="p-2.5">المستخدم</th><th class="p-2.5">عنوان الرؤيا</th><th class="p-2.5">الحالة</th><th class="p-2.5">الرسوم</th><th class="p-2.5">التحكم والإعفاء</th></tr></thead>
            <tbody class="divide-y divide-brand-border">
              ${filteredOrders
                .map(
                  (o) => `
                <tr class="hover:bg-brand-bg/40">
                  <td class="p-2.5 font-mono text-brand-muted">#${o.id}</td>
                  <td class="p-2.5 font-medium text-brand-primary">${o.userName}</td>
                  <td class="p-2.5">${o.title}</td>
                  <td class="p-2.5">${this.getStatusBadge(o.status)}</td>
                  <td class="p-2.5">${o.isPaid ? '<span class="text-emerald-700 font-bold">مسدد</span>' : o.adminUnlocked ? '<span class="text-brand-primary font-bold">معفى مجاناً</span>' : '<span class="text-amber-700 font-bold">معلق (11.5 ريال)</span>'}</td>
                  <td class="p-2.5 flex items-center gap-1.5">
                    <button type="button" onclick="App.showOrderDetails('${o.id}')" class="px-2.5 py-1 bg-white border border-brand-border rounded-lg text-brand-text font-medium text-[11px]">تفاصيل</button>
                    ${!o.isPaid && !o.adminUnlocked ? `<button type="button" onclick="App.adminToggleUnlock('${o.id}')" class="px-2 py-1 bg-brand-primary text-white rounded-lg text-[10px] font-medium" title="السماح للرائي بالاطلاع مجاناً بدون دفع">إعفاء مجاني</button>` : ""}
                  </td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table></div>
        </div>
      `;
    }
    // 3. إدارة المستخدمين
    else if (tab === "users") {
      if (title) title.innerText = "إدارة المستخدمين";
      if (subtitle)
        subtitle.innerText = "عرض بيانات العملاء المسجلين والتحكم بحساباتهم";
      if (actions)
        actions.innerHTML = `
        <button type="button" onclick="App.openAddUserModal()" class="px-3.5 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-xl text-xs font-medium transition flex items-center gap-1.5">
          <i class="fa-solid fa-user-plus text-brand-accent text-[11px]"></i>
          <span>إضافة مستخدم جديد</span>
        </button>
      `;

      container.innerHTML = `
        <div class="overflow-x-auto"><table class="w-full text-right text-xs">
          <thead class="bg-brand-bg text-brand-muted border-b border-brand-border"><tr><th class="p-2.5">الاسم</th><th class="p-2.5">رقم الجوال</th><th class="p-2.5">البريد</th><th class="p-2.5">الحالة</th><th class="p-2.5">التحكم</th></tr></thead>
          <tbody class="divide-y divide-brand-border">
            ${users
              .map(
                (u) => `
              <tr class="hover:bg-brand-bg/40">
                <td class="p-2.5 font-bold text-brand-primary">${u.name}</td>
                <td class="p-2.5 font-mono text-brand-text">${u.phone || "غير مسجل"}</td>
                <td class="p-2.5 font-mono text-brand-muted">${u.email || "-"}</td>
                <td class="p-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-semibold ${u.status === "active" ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-red-50 text-red-800 border border-red-200"}">${u.status === "active" ? "نشط" : "معطل"}</span></td>
                <td class="p-2.5 flex items-center gap-1.5">
                  <button type="button" onclick="App.toggleUserStatus('${u.id}')" class="px-2 py-1 text-[11px] font-medium rounded-lg border ${u.status === "active" ? "border-red-600 text-red-600 hover:bg-red-50" : "border-brand-primary text-brand-primary hover:bg-brand-bg"}">${u.status === "active" ? "تعطيل" : "تفعيل"}</button>
                </td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table></div>
      `;
    }
    // 4. إدارة المفسرين
    else if (tab === "interpreters") {
      if (title) title.innerText = "إدارة المفسرين المعتمدين";
      if (subtitle)
        subtitle.innerText = "سجل المشايخ والمفسرين وإضافة مفسر جديد";
      if (actions)
        actions.innerHTML = `
        <button type="button" onclick="App.openAddInterpreterModal()" class="px-3.5 py-2 bg-brand-primary hover:bg-brand-primaryHover text-white rounded-xl text-xs font-medium transition flex items-center gap-1.5">
          <i class="fa-solid fa-user-plus text-brand-accent text-[11px]"></i>
          <span>إضافة مفسر معتمد</span>
        </button>
      `;

      container.innerHTML = `
        <div class="grid sm:grid-cols-2 gap-4">
          ${interpreters
            .map(
              (i) => `
            <div class="p-4 border border-brand-border rounded-xl bg-white shadow-subtle flex justify-between items-start">
              <div>
                <h5 class="font-bold text-xs text-brand-primary font-display">${i.name}</h5>
                <p class="text-[11px] text-brand-text font-mono mt-0.5">${i.phone || ""}</p>
                <p class="text-[11px] text-brand-muted mt-0.5">${i.specializedIn}</p>
                <div class="text-[11px] text-brand-text mt-2 font-medium">إجمالي التفسيرات المنجزة: <span class="font-bold text-brand-primary">${i.totalInterpreted || 0}</span></div>
              </div>
              <span class="text-[10px] px-2 py-0.5 rounded font-medium bg-brand-bg text-brand-primary border border-brand-border">معتمد</span>
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    }
    // 5. متابعة المبالغ والمالية
    else if (tab === "finance") {
      if (title) title.innerText = "متابعة المبالغ والتدفق المالي";
      if (subtitle)
        subtitle.innerText = "حساب الإيرادات المحصلة ورسوم التفسير المعتمدة";

      container.innerHTML = `
        <div class="space-y-6">
          <div class="grid sm:grid-cols-3 gap-4">
            <div class="bg-brand-bg p-4 rounded-xl border border-brand-border">
              <span class="text-[11px] text-brand-muted block">الإيرادات المحصلة</span>
              <h4 class="text-xl font-bold text-brand-primary font-display mt-1">${stats.totalRevenue || 0} <span class="text-xs font-normal">ريال</span></h4>
            </div>
            <div class="bg-brand-bg p-4 rounded-xl border border-brand-border">
              <span class="text-[11px] text-brand-muted block">المبالغ قيد الانتظار أو الإعفاء</span>
              <h4 class="text-xl font-bold text-amber-700 font-display mt-1">${stats.pendingRevenue || 0} <span class="text-xs font-normal">ريال</span></h4>
            </div>
            <div class="bg-brand-bg p-4 rounded-xl border border-brand-border">
              <span class="text-[11px] text-brand-muted block">تسعيرة الرؤيا</span>
              <h4 class="text-xl font-bold text-brand-primary font-display mt-1">11.5 <span class="text-xs font-normal">ريال / طلب</span></h4>
            </div>
          </div>
        </div>
      `;
    }
    // 6. التقارير والإحصائيات
    else if (tab === "reports") {
      if (title) title.innerText = "التقارير والإحصائيات";
      if (subtitle) subtitle.innerText = "مؤشرات الأداء ومعدلات الإنجاز";

      container.innerHTML = `
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="p-4 border border-brand-border rounded-xl bg-brand-bg/50 space-y-2">
            <h5 class="font-bold text-xs text-brand-primary font-display">معدل إنجاز الطلبات</h5>
            <div class="w-full bg-white rounded-full h-3 border border-brand-border overflow-hidden">
              <div class="bg-brand-primary h-full rounded-full" style="width: ${Math.round((stats.completedOrders / (stats.totalOrders || 1)) * 100)}%"></div>
            </div>
            <span class="text-[11px] text-brand-muted block text-left font-mono">${Math.round((stats.completedOrders / (stats.totalOrders || 1)) * 100)}% مكتمل</span>
          </div>
          <div class="p-4 border border-brand-border rounded-xl bg-brand-bg/50 space-y-2">
            <h5 class="font-bold text-xs text-brand-primary font-display">متوسط وقت الرد والتفسير</h5>
            <h4 class="text-lg font-bold text-brand-primary font-display">18 ساعة <span class="text-xs text-brand-muted font-normal">(ضمن معيار 24 ساعة)</span></h4>
          </div>
        </div>
      `;
    }
    // 7. إدارة الشكاوى والمقترحات مع إمكانية الرد والإغلاق
    else if (tab === "complaints") {
      if (title) title.innerText = "الشكاوى والمقترحات";
      if (subtitle)
        subtitle.innerText =
          "صندوق ملاحظات واستفسارات ومقترحات العملاء ومتابعتها";

      container.innerHTML = `
        <div class="overflow-x-auto"><table class="w-full text-right text-xs">
          <thead class="bg-brand-bg text-brand-muted border-b border-brand-border"><tr><th class="p-2.5">رقم البلاغ</th><th class="p-2.5">المرسل</th><th class="p-2.5">النوع</th><th class="p-2.5">الموضوع</th><th class="p-2.5">الحالة</th><th class="p-2.5">الإجراء</th></tr></thead>
          <tbody class="divide-y divide-brand-border">
            ${complaints
              .map(
                (c) => `
              <tr class="hover:bg-brand-bg/40">
                <td class="p-2.5 font-mono text-brand-muted">#${c.id}</td>
                <td class="p-2.5 font-medium">${c.userName}</td>
                <td class="p-2.5"><span class="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-bg text-brand-primary border border-brand-border">${c.type}</span></td>
                <td class="p-2.5 font-medium text-brand-primary">${c.subject}</td>
                <td class="p-2.5"><span class="${c.status === "مغلقة" ? "text-brand-muted" : "text-amber-700 font-bold"} text-[11px]">${c.status}</span></td>
                <td class="p-2.5"><button type="button" onclick="App.openComplaintDetail('${c.id}')" class="px-2.5 py-1 bg-white border border-brand-border rounded-lg text-brand-text font-medium text-[11px]">مراجعة والرد</button></td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table></div>
      `;
    }
    // 8. إعدادات النظام
    else if (tab === "settings") {
      if (title) title.innerText = "إعدادات النظام والمنصة";
      if (subtitle) subtitle.innerText = "تعديل المتغيرات الأساسية للمشروع";

      const s = LOCAL_MOCK_DB.settings;
      container.innerHTML = `
        <form onsubmit="App.handleSaveSettings(event)" class="max-w-md space-y-3.5 text-xs">
          <div><label class="block font-medium mb-1 text-brand-text">اسم المنصة</label><input type="text" id="setPlatformName" value="${s.platformName || "رؤيا"}" class="w-full px-3 py-2 border border-brand-border rounded-xl"></div>
          <div><label class="block font-medium mb-1 text-brand-text">الوصف العام</label><input type="text" id="setTagline" value="${s.tagline || "تفسير الرؤى والأحلام"}" class="w-full px-3 py-2 border border-brand-border rounded-xl"></div>
          <div><label class="block font-medium mb-1 text-brand-text">سعر التفسير (ريال)</label><input type="number" id="setPrice" value="11.5" disabled class="w-full px-3 py-2 border border-brand-border rounded-xl bg-brand-bg text-brand-muted"></div>
          <button type="submit" class="px-5 py-2.5 bg-brand-primary text-white font-medium rounded-xl shadow-sm">حفظ التغييرات</button>
        </form>
      `;
    }
  },

  async toggleUserStatus(userId) {
    const u = LOCAL_MOCK_DB.users.find((x) => x.id === userId);
    if (u) u.status = u.status === "active" ? "inactive" : "active";
    this.showToast("تم تحديث حالة حساب المستخدم", "info");
    this.renderAdminTabContent();
  },

  async adminToggleUnlock(orderId) {
    const o = LOCAL_MOCK_DB.orders.find((x) => x.id === orderId);
    if (o) {
      o.adminUnlocked = true;
      this.showToast("تم السماح للرائي بالاطلاع على التفسير مجاناً", "success");
      this.renderAdminTabContent();
    }
  },

  async payOrderFee(orderId) {
    const o = LOCAL_MOCK_DB.orders.find((x) => x.id === orderId);
    if (o) {
      o.isPaid = true;
      this.showToast(
        "تم سداد الرسوم (11.5 ريال) وفتح التفسير بالكامل",
        "success",
      );
      this.showOrderDetails(orderId);
    }
  },

  async handleSaveSettings(e) {
    if (e && e.preventDefault) e.preventDefault();
    const platformName = document.getElementById("setPlatformName").value;
    const tagline = document.getElementById("setTagline").value;
    LOCAL_MOCK_DB.settings.platformName = platformName;
    LOCAL_MOCK_DB.settings.tagline = tagline;
    this.showToast("تم حفظ الإعدادات بنجاح", "success");
  },

  openAddInterpreterModal() {
    document.getElementById("addInterpreterModal")?.classList.remove("hidden");
  },
  closeAddInterpreterModal() {
    document.getElementById("addInterpreterModal")?.classList.add("hidden");
  },

  async handleCreateInterpreter(e) {
    if (e && e.preventDefault) e.preventDefault();
    const name = document.getElementById("newIntName").value;
    const phone = document.getElementById("newIntPhone").value;
    const password = document.getElementById("newIntPass").value;
    const specializedIn = document.getElementById("newIntSpec").value;
    const bio = document.getElementById("newIntBio").value;

    LOCAL_MOCK_DB.interpreters.push({
      id: `int_${Date.now()}`,
      name,
      phone,
      password,
      role: "Interpreter",
      status: "active",
      specializedIn,
      bio,
      totalInterpreted: 0,
      rating: 5.0,
    });
    this.showToast("تمت إضافة المفسر بنجاح", "success");
    this.closeAddInterpreterModal();
    this.renderAdminTabContent();
  },

  openAddUserModal() {
    document.getElementById("addUserModal")?.classList.remove("hidden");
  },
  closeAddUserModal() {
    document.getElementById("addUserModal")?.classList.add("hidden");
  },

  async handleCreateUser(e) {
    if (e && e.preventDefault) e.preventDefault();
    const name = document.getElementById("newUsrName").value;
    const phone = document.getElementById("newUsrPhone").value;
    const password = document.getElementById("newUsrPass").value;

    LOCAL_MOCK_DB.users.push({
      id: `usr_${Date.now()}`,
      name,
      phone,
      password,
      role: "User",
      status: "active",
      createdAt: new Date().toISOString(),
    });
    this.showToast("تمت إضافة المستخدم بنجاح", "success");
    this.closeAddUserModal();
    this.renderAdminTabContent();
  },

  openAddComplaintModal() {
    document.getElementById("addComplaintModal")?.classList.remove("hidden");
  },
  closeAddComplaintModal() {
    document.getElementById("addComplaintModal")?.classList.add("hidden");
  },

  async handleCreateComplaint(e) {
    if (e && e.preventDefault) e.preventDefault();
    const type = document.getElementById("complaintType").value;
    const subject = document.getElementById("complaintSubject").value;
    const text = document.getElementById("complaintText").value;

    LOCAL_MOCK_DB.complaints.push({
      id: `CMP-${Date.now()}`,
      userId: this.state.currentUser ? this.state.currentUser.id : "usr_1",
      userName: this.state.currentUser ? this.state.currentUser.name : "عميل",
      type,
      subject,
      text,
      status: "جديدة وقيد المراجعة",
      adminReply: null,
      createdAt: new Date().toISOString(),
    });
    this.showToast("تم إرسال رسالتك للإدارة مجاناً بنجاح", "success");
    this.closeAddComplaintModal();
  },

  openComplaintDetail(complaintId) {
    const c = LOCAL_MOCK_DB.complaints.find((x) => x.id === complaintId);
    if (!c) return;

    const modal = document.getElementById("complaintDetailModal");
    const content = document.getElementById("complaintDetailModalContent");
    if (!modal || !content) return;

    content.innerHTML = `
      <div class="flex justify-between items-center pb-3 border-b border-brand-border mb-3">
        <div>
          <h4 class="text-sm font-bold text-brand-primary font-display">${c.type}: ${c.subject}</h4>
          <span class="text-[10px] text-brand-muted">المرسل: ${c.userName}</span>
        </div>
        <button type="button" onclick="App.closeComplaintDetail()" class="text-brand-muted"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="space-y-3 text-xs">
        <div class="bg-brand-bg p-3 rounded-xl border border-brand-border">
          <span class="font-bold text-brand-primary block mb-1">نص الرسالة:</span>
          <p class="text-brand-text leading-relaxed whitespace-pre-wrap">${c.text}</p>
        </div>

        <form onsubmit="App.handleReplyAndCloseComplaint(event, '${c.id}')" class="space-y-2">
          <label class="block font-bold text-brand-primary">رد الإدارة وإغلاق البلاغ:</label>
          <textarea id="replyText" rows="3" required placeholder="اكتب رد الإدارة على العميل..." class="w-full p-2.5 border border-brand-border rounded-xl text-xs outline-none focus:border-brand-primary">${c.adminReply || ""}</textarea>
          <div class="flex justify-end gap-2 pt-2">
            <button type="button" onclick="App.closeComplaintDetail()" class="px-4 py-2 border rounded-xl">إلغاء</button>
            <button type="submit" class="px-5 py-2 bg-brand-primary text-white font-medium rounded-xl">إرسال الرد وإغلاق الشكوى</button>
          </div>
        </form>
      </div>
    `;
    modal.classList.remove("hidden");
  },

  closeComplaintDetail() {
    document.getElementById("complaintDetailModal")?.classList.add("hidden");
  },

  async handleReplyAndCloseComplaint(e, complaintId) {
    if (e && e.preventDefault) e.preventDefault();
    const replyText = document.getElementById("replyText").value;
    const c = LOCAL_MOCK_DB.complaints.find((x) => x.id === complaintId);
    if (c) {
      c.adminReply = replyText;
      c.status = "مغلقة ومجاب عليها";
      c.closedAt = new Date().toISOString();
    }
    this.showToast("تم إرسال الرد وإغلاق التذكرة بنجاح", "success");
    this.closeComplaintDetail();
    this.renderAdminTabContent();
  },

  // ===================== لوحة المتابع والممول =====================
  async loadObserverDashboard() {
    this.renderObsTabContent();
  },

  setObsTab(tab) {
    this.state.obsActiveTab = tab;
    this.renderSidebar();
    this.renderObsTabContent();
  },

  async renderObsTabContent() {
    const container = document.getElementById("obsTabContent");
    const kpi = document.getElementById("obsKpis");
    if (!container) return;

    const tab = this.state.obsActiveTab;
    const stats = await this.apiRequest("/admin/stats");
    const orders = LOCAL_MOCK_DB.orders;
    const interpreters = LOCAL_MOCK_DB.interpreters;

    if (kpi) {
      kpi.innerHTML = `
        <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">المستخدمون</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.totalUsers || 2}</h4></div>
        <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">المفسرون</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.totalInterpreters || 2}</h4></div>
        <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">إجمالي الرؤى</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.totalOrders || 3}</h4></div>
        <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">جديدة</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.newOrders || 1}</h4></div>
        <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">قيد المعالجة</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.inProgressOrders || 1}</h4></div>
        <div class="bg-white p-3.5 rounded-xl border border-brand-border shadow-subtle"><span class="text-[10px] text-brand-muted font-medium">مكتملة</span><h4 class="text-base font-bold text-brand-primary mt-0.5 font-display">${stats.completedOrders || 1}</h4></div>
      `;
    }

    if (tab === "stats" || tab === "all_orders") {
      container.innerHTML = `
        <div class="space-y-4">
          <h4 class="text-xs font-bold text-brand-primary font-display">متابعة سجل الرؤى والطلبات (للقراءة فقط)</h4>
          <div class="overflow-x-auto"><table class="w-full text-right text-xs">
            <thead class="bg-brand-bg text-brand-muted border-b border-brand-border"><tr><th class="p-2.5">رقم الطلب</th><th class="p-2.5">صاحب الرؤيا</th><th class="p-2.5">عنوان الرؤيا</th><th class="p-2.5">الحالة</th><th class="p-2.5">استعراض</th></tr></thead>
            <tbody class="divide-y divide-brand-border">
              ${orders
                .map(
                  (o) => `
                <tr class="hover:bg-brand-bg/50">
                  <td class="p-2.5 font-mono text-brand-muted">#${o.id}</td>
                  <td class="p-2.5">${o.userName}</td>
                  <td class="p-2.5 font-medium text-brand-primary">${o.title}</td>
                  <td class="p-2.5">${this.getStatusBadge(o.status)}</td>
                  <td class="p-2.5"><button type="button" onclick="App.showOrderDetails('${o.id}')" class="px-2.5 py-1 bg-white border border-brand-border rounded-lg text-brand-text font-medium text-[11px]">اطلاع كامل</button></td>
                </tr>
              `,
                )
                .join("")}
            </tbody>
          </table></div>
        </div>
      `;
    } else if (tab === "interpreters") {
      container.innerHTML = `
        <div class="grid sm:grid-cols-2 gap-3">
          ${interpreters
            .map(
              (i) => `
            <div class="p-4 border border-brand-border rounded-xl bg-white shadow-subtle">
              <h5 class="font-bold text-xs text-brand-primary font-display">${i.name}</h5>
              <p class="text-[11px] text-brand-muted mt-0.5">${i.specializedIn}</p>
              <div class="text-[11px] text-brand-text mt-2 font-medium">إجمالي التفسيرات: ${i.totalInterpreted || 0} رؤيا</div>
            </div>
          `,
            )
            .join("")}
        </div>
      `;
    } else if (tab === "finance") {
      container.innerHTML = `
        <div class="p-5 bg-brand-bg border border-brand-border rounded-xl space-y-2 text-xs">
          <span class="text-brand-muted block">الإيراد التراكمي المحقق</span>
          <h3 class="text-2xl font-bold text-brand-primary font-display">${stats.totalRevenue || 0} ريال</h3>
          <p class="text-brand-muted text-[11px]">بناءً على تسعيرة 11.5 ريال لكل طلب مدفوع.</p>
        </div>
      `;
    }
  },

  // ===================== تفاصيل الطلب مع حجب التفسير حتى السداد/الإعفاء =====================
  async showOrderDetails(orderId) {
    const order = LOCAL_MOCK_DB.orders.find((o) => o.id === orderId);
    if (!order) return;

    const modal = document.getElementById("orderDetailsModal");
    const content = document.getElementById("orderDetailsModalContent");
    if (!modal || !content) return;

    const isDone =
      order.status === "مكتمل" ||
      order.status === "تم التفسير" ||
      order.status === "تم التسليم";
    const isInProgress = order.status === "قيد التفسير" || isDone;
    const isUnlocked =
      order.isPaid ||
      order.adminUnlocked ||
      this.state.currentRole === "Admin" ||
      this.state.currentRole === "Interpreter" ||
      this.state.currentRole === "Observer";

    content.innerHTML = `
      <div class="flex justify-between items-center pb-3.5 border-b border-brand-border mb-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-xs font-mono text-brand-muted">#${order.id}</span>
            <h4 class="text-sm font-bold text-brand-primary font-display">${order.title}</h4>
          </div>
          <span class="text-[10px] text-brand-muted">${new Date(order.createdAt).toLocaleString("ar-SA")}</span>
        </div>
        <button type="button" onclick="App.closeOrderDetails()" class="text-brand-muted hover:text-brand-text"><i class="fa-solid fa-xmark"></i></button>
      </div>

      <div class="space-y-4 text-xs">
        
        <!-- مراحل الطلب (Timeline) -->
        <div class="bg-brand-bg p-4 rounded-xl border border-brand-border space-y-2">
          <span class="text-[11px] font-bold text-brand-primary block mb-2">مراحل الطلب:</span>
          <div class="grid grid-cols-4 gap-2 text-center text-[10px]">
            <div class="space-y-1">
              <div class="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center mx-auto text-[10px]"><i class="fa-solid fa-check"></i></div>
              <span class="font-bold text-brand-primary block">تم الإرسال</span>
            </div>
            <div class="space-y-1">
              <div class="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center mx-auto text-[10px]"><i class="fa-solid fa-check"></i></div>
              <span class="font-bold text-brand-primary block">تم الاستلام</span>
            </div>
            <div class="space-y-1">
              <div class="w-6 h-6 rounded-full ${isInProgress ? "bg-brand-primary text-white" : "bg-white text-brand-muted border border-brand-border"} flex items-center justify-center mx-auto text-[10px]">
                ${isInProgress ? '<i class="fa-solid fa-check"></i>' : "3"}
              </div>
              <span class="font-medium ${isInProgress ? "text-brand-primary font-bold" : "text-brand-muted"} block">قيد التفسير</span>
            </div>
            <div class="space-y-1">
              <div class="w-6 h-6 rounded-full ${isDone ? "bg-brand-primary text-white" : "bg-white text-brand-muted border border-brand-border"} flex items-center justify-center mx-auto text-[10px]">
                ${isDone ? '<i class="fa-solid fa-check"></i>' : "4"}
              </div>
              <span class="font-medium ${isDone ? "text-brand-primary font-bold" : "text-brand-muted"} block">تم التفسير</span>
            </div>
          </div>
        </div>

        <!-- نص وتفاصيل الرؤيا -->
        <div class="bg-white p-4 rounded-xl border border-brand-border space-y-1.5">
          <span class="font-bold text-brand-primary block">تفاصيل الرؤيا:</span>
          <p class="text-brand-text leading-relaxed whitespace-pre-wrap">${order.dreamText || "تم إرسال الرؤيا عبر تسجيل صوتي فقط."}</p>
          ${
            order.audioUrl
              ? `
            <div class="pt-2">
              <span class="text-[10px] font-bold text-brand-muted block mb-1">تسجيل الرؤيا الصوتي:</span>
              <audio controls src="${order.audioUrl}" class="w-full h-8"></audio>
            </div>
          `
              : ""
          }
        </div>

        <!-- نتيجة التفسير (مع الحجب الذكي في حال عدم السداد أو الإعفاء) -->
        ${
          order.interpretation
            ? `
          ${
            isUnlocked
              ? `
            <div class="bg-brand-bg border border-brand-border p-4 rounded-xl space-y-2">
              <div class="flex items-center justify-between">
                <h5 class="font-bold text-brand-primary flex items-center gap-1.5 font-display"><i class="fa-solid fa-feather-pointed text-brand-accent"></i> تفسير: ${order.interpretation.interpreterName}</h5>
                <span class="text-[10px] text-brand-muted">${new Date(order.interpretation.createdAt).toLocaleDateString("ar-SA")}</span>
              </div>
              <p class="text-brand-text leading-relaxed font-serif text-sm">${order.interpretation.text}</p>
              ${
                order.interpretation.audioUrl
                  ? `
                <div class="pt-2">
                  <span class="text-[10px] font-bold text-brand-muted block mb-1">التفسير الصوتي للمفسر:</span>
                  <audio controls src="${order.interpretation.audioUrl}" class="w-full h-8"></audio>
                </div>
              `
                  : ""
              }
            </div>
          `
              : `
            <div class="bg-amber-50/80 border border-amber-200 p-5 rounded-xl text-center space-y-3">
              <div class="w-10 h-10 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto text-base">
                <i class="fa-solid fa-lock"></i>
              </div>
              <h5 class="font-bold text-brand-primary text-sm font-display">تم الانتهاء من تفسير رؤيتك من قبل الشيخ</h5>
              <p class="text-xs text-brand-muted max-w-xs mx-auto">للاطلاع والاستماع إلى التفسير الكامل، يرجى سداد رسوم الخدمة الرمزية (11.5 ريال).</p>
              <button type="button" onclick="App.payOrderFee('${order.id}')" class="px-6 py-2.5 bg-brand-primary hover:bg-brand-primaryHover text-white font-bold text-xs rounded-xl shadow transition">
                سداد الرسوم (11.5 ريال) وفتح التفسير
              </button>
            </div>
          `
          }
        `
            : `
          <div class="text-center p-5 bg-brand-bg rounded-xl border border-dashed border-brand-border text-brand-muted text-xs">
            الرؤيا قيد التأمل والمراجعة من قبل المفسر المعتمد، وستصلك رسالة باكتمالها فوراً.
          </div>
        `
        }
      </div>

      <div class="mt-5 pt-3 border-t border-brand-border flex justify-end">
        <button type="button" onclick="App.closeOrderDetails()" class="px-5 py-2 bg-white hover:bg-brand-bg border border-brand-border text-brand-text rounded-xl text-xs font-medium transition">إغلاق</button>
      </div>
    `;

    modal.classList.remove("hidden");
  },

  closeOrderDetails() {
    document.getElementById("orderDetailsModal")?.classList.add("hidden");
  },

  getStatusBadge(status) {
    if (status === "جديد") {
      return '<span class="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full border border-slate-200">جديد</span>';
    }
    if (status === "قيد التفسير" || status === "قيد المراجعة") {
      return '<span class="px-2.5 py-1 bg-amber-50 text-amber-800 text-[10px] font-semibold rounded-full border border-amber-200">قيد التفسير</span>';
    }
    if (
      status === "مكتمل" ||
      status === "تم التفسير" ||
      status === "تم التسليم"
    ) {
      return '<span class="px-2.5 py-1 bg-emerald-50 text-brand-primary text-[10px] font-bold rounded-full border border-emerald-200">تم التفسير</span>';
    }
    return `<span class="px-2.5 py-1 bg-slate-100 text-slate-700 text-[10px] font-semibold rounded-full">${status}</span>`;
  },

  async fetchInterpretersPublic() {
    this.state.interpreters = LOCAL_MOCK_DB.interpreters;
  },

  async fetchSettings() {
    this.state.settings = LOCAL_MOCK_DB.settings;
  },

  showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toastMessage");
    const icon = document.getElementById("toastIcon");
    if (!toast || !msg) return;

    msg.innerText = message;
    if (type === "error")
      icon.className = "fa-solid fa-circle-exclamation text-red-400 text-sm";
    else if (type === "info")
      icon.className = "fa-solid fa-circle-info text-brand-accent text-sm";
    else icon.className = "fa-solid fa-circle-check text-brand-accent text-sm";

    toast.classList.remove("translate-y-20", "opacity-0");
    setTimeout(() => {
      toast.classList.add("translate-y-20", "opacity-0");
    }, 3500);
  },

  async resetData() {
    await this.apiRequest("/admin/reset-demo", "POST");
    this.showToast("تمت استعادة البيانات التجريبية بنجاح", "success");
    setTimeout(() => window.location.reload(), 500);
  },
};

window.addEventListener("DOMContentLoaded", () => App.init());
