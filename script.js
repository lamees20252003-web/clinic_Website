// الخدمات: عدّلها من هنا
const services = [
  { icon: "🔍", title: "الفحص والتشخيص", text: "فحص شامل للأسنان واللثة مع خطة علاج واضحة." },
  { icon: "🧽", title: "تنظيف وتلميع الأسنان", text: "إزالة الجير والتصبغات للحفاظ على صحة اللثة." },
  { icon: "🦷", title: "حشوات تجميلية", text: "علاج التسوس بحشوات بلون السن الطبيعي." },
  { icon: "🩺", title: "علاج العصب", text: "إنقاذ السن المصاب والتخلص من الألم." },
  { icon: "✨", title: "تبييض الأسنان", text: "ابتسامة أكثر إشراقًا بطرق آمنة." },
  { icon: "😁", title: "تقويم الأسنان", text: "تصحيح اصطفاف الأسنان للصغار والكبار." },
  { icon: "🔩", title: "زراعة وتركيبات", text: "تيجان وجسور وزراعة لتعويض الأسنان المفقودة." },
  { icon: "👶", title: "أسنان الأطفال", text: "رعاية وقائية وعلاج بأسلوب لطيف ومطمئن." }
];

const $ = (id) => document.getElementById(id);

// عرض الخدمات وتعبئة قائمة الاختيار
const grid = $("servicesGrid");
const select = $("service");
services.forEach((s) => {
  grid.insertAdjacentHTML("beforeend",
    `<div class="card reveal">
       <div class="ic">${s.icon}</div>
       <h3>${s.title}</h3>
       <p>${s.text}</p>
     </div>`);
  select.insertAdjacentHTML("beforeend", `<option value="${s.title}">${s.title}</option>`);
});

// الوضع الفاتح / الداكن
const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}
$("themeBtn").addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// قائمة الجوال
const links = $("links");
$("menuBtn").addEventListener("click", () => links.classList.toggle("open"));
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") links.classList.remove("open");
});

// ظهور العناصر عند التمرير
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// منع اختيار تاريخ قديم
const today = new Date().toISOString().split("T")[0];
$("date").min = today;

// نموذج الحجز
$("bookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("name").value.trim();
  const phone = $("phone").value.trim();
  const date = $("date").value;
  let valid = true;

  ["nameErr", "phoneErr", "dateErr"].forEach((id) => ($(id).textContent = ""));

  if (name.length < 3) { $("nameErr").textContent = "الرجاء كتابة الاسم الكامل"; valid = false; }
  if (!/^[0-9+\s-]{8,15}$/.test(phone)) { $("phoneErr").textContent = "رقم الهاتف غير صحيح"; valid = false; }
  if (!date || date < today) { $("dateErr").textContent = "اختر تاريخًا صحيحًا"; valid = false; }
  if (!valid) return;

  // هنا يمكنك ربط النموذج بخادم أو واتساب أو بريد إلكتروني
  const ok = $("okMsg");
  ok.textContent = `شكرًا ${name}! تم استلام طلب حجزك لخدمة «${$("service").value}» بتاريخ ${date}. سنتواصل معك لتأكيد الموعد.`;
  ok.hidden = false;
  e.target.reset();
});

$("year").textContent = new Date().getFullYear();
