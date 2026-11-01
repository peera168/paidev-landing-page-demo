// ===== ข้อมูลเมนู =====
const menuItems = [
  { name: "เอสเพรสโซ่", desc: "เข้มข้น หอมกลมกล่อม", price: 55, icon: "☕", type: "coffee" },
  { name: "ลาเต้", desc: "นมสดเนียนนุ่ม", price: 65, icon: "🥛", type: "coffee" },
  { name: "คาปูชิโน่", desc: "ฟองนมหนานุ่ม", price: 65, icon: "☕", type: "coffee" },
  { name: "ชาไทย", desc: "สูตรเข้มข้นแบบไทยแท้", price: 50, icon: "🧋", type: "tea" },
  { name: "มัทฉะลาเต้", desc: "มัทฉะเกรดพรีเมียม", price: 75, icon: "🍵", type: "tea" },
  { name: "ครัวซองต์", desc: "อบใหม่ทุกเช้า กรอบนอกนุ่มใน", price: 60, icon: "🥐", type: "bakery" },
  { name: "ชีสเค้ก", desc: "เนื้อเนียน หอมชีส", price: 85, icon: "🍰", type: "bakery" },
  { name: "บราวนี่", desc: "ช็อกโกแลตเข้มข้น", price: 55, icon: "🍫", type: "bakery" },
];

const menuGrid = document.getElementById("menuGrid");

// สร้างการ์ดเมนู
menuGrid.innerHTML = menuItems.map(item => `
  <div class="card reveal" data-type="${item.type}">
    <div class="icon">${item.icon}</div>
    <h3>${item.name}</h3>
    <p>${item.desc}</p>
    <span class="price">฿${item.price}</span>
  </div>
`).join("");

// ===== ตัวกรองเมนู =====
document.querySelectorAll(".filter").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter.active").classList.remove("active");
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".card").forEach(card => {
      card.classList.toggle("hide", filter !== "all" && card.dataset.type !== filter);
    });
  });
});

// ===== Navbar เปลี่ยนสีเมื่อเลื่อน + ปุ่มกลับขึ้นบน =====
const navbar = document.getElementById("navbar");
const toTop = document.getElementById("toTop");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 50);
  toTop.classList.toggle("show", window.scrollY > 500);
});

toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// ===== เมนูมือถือ =====
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== ตัวนับตัวเลข =====
function animateCounter(el) {
  const target = +el.dataset.target;
  const duration = 1500;
  const start = performance.now();
  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target).toLocaleString() + (progress === 1 ? "+" : "");
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== แอนิเมชันตอนเลื่อนเห็น =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    entry.target.querySelectorAll(".counter").forEach(animateCounter);
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ===== ฟอร์มติดต่อ =====
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("formMsg");
  msg.textContent = `ขอบคุณค่ะคุณ ${name} เราจะติดต่อกลับโดยเร็ว ☕`;
  e.target.reset();
  setTimeout(() => (msg.textContent = ""), 4000);
});

// ===== ปีปัจจุบันใน footer =====
document.getElementById("year").textContent = new Date().getFullYear();
