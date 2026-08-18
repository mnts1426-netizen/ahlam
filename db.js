const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "data.json");

const INITIAL_DATA = {
  settings: {
    platformName: "تعبير",
    tagline: "لتفسير الرؤى والأحلام الموثوق",
    contactEmail: "support@tabeer.com",
    allowNewOrders: true,
    audioMaxDurationSec: 180,
  },
  observers: [
    {
      id: "obs_1",
      name: "أ. عبدالعزيز (المتابع والممول)",
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
      email: "admin@demo.com",
      role: "Admin",
      status: "active",
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
    },
  ],
  interpretations: [
    {
      id: "INT-5001",
      orderId: "ORD-1001",
      interpreterId: "int_1",
      interpreterName: "الشيخ أحمد المنصور",
      text: "بسم الله والحمد لله والصلاة والسلام على رسول الله. البحر الصافي يدل على رزق واسع وطمأنينة وذهاب هم، والسفينة ذات الشراع الأخضر نجاة وتوفيق وبشارة خير ورجل صالح يعينك على أمر دينك ودنياك. رؤيا خير وبركة إن شاء الله.",
      audioUrl: null,
      internalNotes: "رؤيا طيبة ومباشرة الرموز",
      createdAt: "2026-08-16T12:00:00Z",
    },
  ],
  notifications: [
    {
      id: "notif_1",
      userId: "usr_1",
      title: "تم تسليم التفسير",
      message: "قام الشيخ أحمد المنصور بتفسير رؤيتك (رؤية البحر الصافي).",
      orderId: "ORD-1001",
      read: false,
      createdAt: "2026-08-16T12:00:00Z",
    },
    {
      id: "notif_2",
      userId: "usr_2",
      title: "بدء دراسة الرؤيا",
      message: "طلبك الآن قيد المعالجة والتأمل من قبل المفسر.",
      orderId: "ORD-1002",
      read: true,
      createdAt: "2026-08-17T09:00:00Z",
    },
  ],
};

function readDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
    return INITIAL_DATA;
  }
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (e) {
    return INITIAL_DATA;
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
}

module.exports = {
  get: () => readDb(),
  save: (data) => writeDb(data),
  resetDemoData: () => writeDb(INITIAL_DATA),
};
