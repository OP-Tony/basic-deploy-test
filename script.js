// Soft halo background and subtle interactions inspired by clarity and restraint.

const canvas = document.getElementById("halo");
const ctx = canvas.getContext("2d", { alpha: true });
let w,
  h,
  t = 0;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function drawHalo() {
  ctx.clearRect(0, 0, w, h);
  const grad = ctx.createRadialGradient(
    w * 0.7 + Math.sin(t / 1000) * 40,
    h * 0.2 + Math.cos(t / 1300) * 30,
    60,
    w * 0.5,
    h * 0.5,
    Math.max(w, h) * 0.8
  );
  grad.addColorStop(0, "rgba(77,163,255,0.20)");
  grad.addColorStop(0.25, "rgba(30,102,255,0.16)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);
}

function tick(ts) {
  t = ts;
  drawHalo();
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);

// Smooth scroll from the hero CTA
document.getElementById("ctaLearn")?.addEventListener("click", () => {
  document
    .getElementById("craft")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Minimal “Notify me” demo toast
const toast = document.getElementById("toast");
document.getElementById("notifyBtn")?.addEventListener("click", () => {
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2400);
});

// Reduce motion preference: pause halo if user prefers less motion
const mediaMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if (mediaMotion.matches) {
  cancelAnimationFrame(tick);
  ctx.clearRect(0, 0, w, h);
}
