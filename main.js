// Theme + language toggles (initial values are set inline in <head>)
const root = document.documentElement;
const save = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

document.getElementById("themeToggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
  save("theme", root.dataset.theme);
});

document.getElementById("langToggle").addEventListener("click", () => {
  const next = root.dataset.lang === "zh" ? "en" : "zh";
  root.dataset.lang = next;
  root.lang = next === "zh" ? "zh-CN" : "en";
  document.title = next === "zh" ? "高占廷 · UBC 电气工程" : "Peter Gao · Electrical Engineering, UBC";
  save("lang", next);
});

// Copy-to-clipboard (WeChat ID)
document.querySelectorAll("[data-copy]").forEach((btn) => {
  const hint = btn.querySelector("[data-copied-text]");
  const original = hint.innerHTML;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      hint.innerHTML = '<span lang="en">Copied ✓</span><span lang="zh">已复制 ✓</span>';
    } catch (e) {
      hint.innerHTML = '<span lang="en">ID: </span><span lang="zh">微信号：</span>' + btn.dataset.copy;
    }
    setTimeout(() => (hint.innerHTML = original), 1800);
  });
});

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Nav border on scroll
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Highlight current section in nav
const links = [...document.querySelectorAll(".nav__links a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => s && spy.observe(s));

// Fade-in on scroll
const revealTargets = document.querySelectorAll(".section__title, .about, .timeline__item, .feature, .card, .course-group, .skills__group, .contact");
revealTargets.forEach((el) => el.classList.add("reveal"));
const revealer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => revealer.observe(el));
