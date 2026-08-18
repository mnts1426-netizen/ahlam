const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "data.json");

const INITIAL_DATA = {
  settings: {
    platformName: "رؤيا",
    pricePerOrder: 11.5,
    tagline: "لتفسير الرؤى والأحلام الموثوق",
    contactEmail: "support@ruya.app",
    allowNewOrders: true,
    audioMaxDurationSec: 180,
  },
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
