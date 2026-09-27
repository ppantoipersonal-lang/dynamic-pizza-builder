/* ===== Dynamic Pizza Builder — app.js ===== */
"use strict";

/* ---------- TOPPING DATA (inline SVG generators) ---------- */
const TOPPINGS = [
  {
    id: "pepperoni",
    name: "Pepperoni",
    price: 40,
    emoji: "🔴",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <circle r="14" fill="#b5271d"/>
      <circle r="14" fill="url(#pepGrad)"/>
      <circle r="11" fill="#c93a2e" opacity=".7"/>
      <circle cx="-4" cy="-3" r="2.2" fill="#8e1a12" opacity=".6"/>
      <circle cx="4" cy="4" r="1.8" fill="#8e1a12" opacity=".5"/>
      <circle cx="2" cy="-5" r="1.4" fill="#8e1a12" opacity=".5"/>
      <circle cx="-5" cy="5" r="1.6" fill="#8e1a12" opacity=".4"/>
      <ellipse cx="0" cy="0" rx="13" ry="13" fill="none" stroke="#7a1510" stroke-width="1.2" opacity=".5"/>
    </g>`,
  },
  {
    id: "mushroom",
    name: "Mushroom",
    price: 35,
    emoji: "🍄",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <ellipse cx="0" cy="2" rx="11" ry="7" fill="#d4a96a"/>
      <ellipse cx="0" cy="0" rx="12" ry="8" fill="#e8c88a"/>
      <ellipse cx="0" cy="-1" rx="10" ry="6" fill="#f0d9a8" opacity=".6"/>
      <rect x="-3" y="4" width="6" height="8" rx="3" fill="#c9a060"/>
      <path d="M-8 1 Q0 -6 8 1" fill="none" stroke="#b08840" stroke-width=".8" opacity=".5"/>
    </g>`,
  },
  {
    id: "olive",
    name: "Black Olive",
    price: 30,
    emoji: "🫒",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <circle r="9" fill="#1a1a1a"/>
      <circle r="9" fill="url(#oliveGrad)"/>
      <circle r="4" fill="#2d2d2d"/>
      <circle r="3" fill="#0d0d0d"/>
      <ellipse cx="-3" cy="-3" rx="2.5" ry="1.5" fill="#444" opacity=".5"/>
    </g>`,
  },
  {
    id: "capsicum",
    name: "Capsicum",
    price: 25,
    emoji: "🫑",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <path d="M-12 0 Q-10 -8 0 -10 Q10 -8 12 0 Q10 8 0 10 Q-10 8 -12 0Z" fill="#2d8c3c"/>
      <path d="M-9 0 Q-7 -6 0 -7 Q7 -6 9 0 Q7 6 0 7 Q-7 6 -9 0Z" fill="#3aad4a" opacity=".7"/>
      <path d="M-6 0 Q0 -5 6 0" fill="none" stroke="#1e6b2a" stroke-width="1" opacity=".6"/>
      <path d="M-6 1 Q0 5 6 1" fill="none" stroke="#1e6b2a" stroke-width=".8" opacity=".4"/>
    </g>`,
  },
  {
    id: "onion",
    name: "Onion Ring",
    price: 20,
    emoji: "🧅",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <circle r="11" fill="none" stroke="#e8d0f0" stroke-width="4" opacity=".9"/>
      <circle r="11" fill="none" stroke="#c9a0d8" stroke-width="2" opacity=".5"/>
      <circle r="7" fill="none" stroke="#f0e0f8" stroke-width="1.5" opacity=".6"/>
      <circle r="13" fill="none" stroke="#d4b0e0" stroke-width="1" opacity=".4"/>
    </g>`,
  },
  {
    id: "corn",
    name: "Sweet Corn",
    price: 25,
    emoji: "🌽",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <ellipse cx="-4" cy="-3" rx="3" ry="4" fill="#f5d033"/>
      <ellipse cx="3" cy="-2" rx="3" ry="4" fill="#e8c420"/>
      <ellipse cx="0" cy="4" rx="3" ry="4" fill="#f0cc28"/>
      <ellipse cx="-4" cy="-3" rx="2" ry="2.5" fill="#ffe066" opacity=".5"/>
      <ellipse cx="3" cy="-2" rx="2" ry="2.5" fill="#ffe066" opacity=".4"/>
    </g>`,
  },
  {
    id: "paneer",
    name: "Paneer",
    price: 45,
    emoji: "🧀",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <rect x="-10" y="-10" width="20" height="20" rx="3" fill="#f5f0e0"/>
      <rect x="-10" y="-10" width="20" height="20" rx="3" fill="url(#paneerGrad)"/>
      <rect x="-8" y="-8" width="16" height="16" rx="2" fill="#faf5e8" opacity=".5"/>
      <line x1="-6" y1="0" x2="6" y2="0" stroke="#e0d8c0" stroke-width=".6" opacity=".4"/>
      <line x1="0" y1="-6" x2="0" y2="6" stroke="#e0d8c0" stroke-width=".6" opacity=".4"/>
    </g>`,
  },
  {
    id: "jalapeno",
    name: "Jalapeño",
    price: 30,
    emoji: "🌶️",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <circle r="9" fill="#2a7a2a"/>
      <circle r="6" fill="#3d9e3d"/>
      <circle r="3" fill="#c8e6c8"/>
      <circle cx="-2" cy="-2" r="1" fill="#f0f0e0" opacity=".7"/>
      <circle cx="2" cy="1" r="1" fill="#f0f0e0" opacity=".6"/>
      <circle cx="-1" cy="3" r=".8" fill="#f0f0e0" opacity=".5"/>
    </g>`,
  },
  {
    id: "tomato",
    name: "Tomato Slice",
    price: 25,
    emoji: "🍅",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <circle r="12" fill="#e03020"/>
      <circle r="10" fill="#e84030"/>
      <circle r="5" fill="#f06050" opacity=".6"/>
      <path d="M0 -8 L2 -2 L0 0 L-2 -2Z" fill="#f8a090" opacity=".5"/>
      <path d="M6 4 L3 1 L0 2 L2 5Z" fill="#f8a090" opacity=".4"/>
      <path d="M-6 4 L-3 1 L0 2 L-2 5Z" fill="#f8a090" opacity=".4"/>
      <circle r="11" fill="none" stroke="#c02818" stroke-width="1" opacity=".5"/>
    </g>`,
  },
  {
    id: "basil",
    name: "Basil Leaf",
    price: 20,
    emoji: "🌿",
    svg: (x, y, s, rot) => `<g transform="translate(${x},${y}) rotate(${rot}) scale(${s})">
      <path d="M0 -12 Q8 -6 6 2 Q4 8 0 12 Q-4 8 -6 2 Q-8 -6 0 -12Z" fill="#2d7a30"/>
      <path d="M0 -10 Q6 -5 4 1 Q2 6 0 10 Q-2 6 -4 1 Q-6 -5 0 -10Z" fill="#3a9e3e" opacity=".7"/>
      <line x1="0" y1="-10" x2="0" y2="10" stroke="#1e5a20" stroke-width=".8" opacity=".6"/>
      <path d="M0 -4 Q3 -2 4 1" fill="none" stroke="#1e5a20" stroke-width=".5" opacity=".4"/>
      <path d="M0 -4 Q-3 -2 -4 1" fill="none" stroke="#1e5a20" stroke-width=".5" opacity=".4"/>
    </g>`,
  },
];

/* ---------- SIZE & CRUST DATA ---------- */
const SIZES = [
  { id: "small", label: '8"', radius: 100, basePrice: 120, slices: 4 },
  { id: "medium", label: '10"', radius: 130, basePrice: 180, slices: 6 },
  { id: "large", label: '12"', radius: 155, basePrice: 240, slices: 8 },
];

const CRUSTS = [
  { id: "classic", label: "Classic", price: 0, color: "#d4a050", edge: "#b8863a" },
  { id: "thin", label: "Thin Crust", price: 0, color: "#c89848", edge: "#a87830" },
  { id: "stuffed", label: "Cheese Stuffed", price: 50, color: "#e0b060", edge: "#c89040" },
  { id: "wheat", label: "Wheat", price: 30, color: "#a07038", edge: "#8a6030" },
];

/* ---------- STATE ---------- */
let state = {
  size: "medium",
  crust: "classic",
  toppings: [], // [{id, toppingId, x, y, rot, scale, seed}]
  baked: false,
  nextId: 1,
};

/* ---------- SEEDED RANDOM ---------- */
function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generatePlacement(toppingId, pizzaRadius) {
  const seed = Date.now() + Math.random() * 10000;
  const rng = seededRandom(seed);
  const angle = rng() * Math.PI * 2;
  const dist = rng() * (pizzaRadius * 0.72);
  const x = Math.cos(angle) * dist;
  const y = Math.sin(angle) * dist;
  const rot = (rng() * 360).toFixed(1);
  const scale = 0.7 + rng() * 0.4;
  return { id: state.nextId++, toppingId, x, y, rot, scale, seed };
}

/* ---------- DOM REFS ---------- */
const $pizzaStage = document.getElementById("pizza-stage");
const $toppingsTray = document.getElementById("toppings-tray");
const $sizeBtns = document.querySelectorAll("[data-size]");
const $crustBtns = document.querySelectorAll("[data-crust]");
const $priceDisplay = document.getElementById("price-display");
const $orderBtn = document.getElementById("order-btn");
const $resetBtn = document.getElementById("reset-btn");
const $surpriseBtn = document.getElementById("surprise-btn");
const $bakeBtn = document.getElementById("bake-btn");
const $toppingCount = document.getElementById("topping-count");
const $dropGlow = document.getElementById("drop-glow");

/* ---------- SVG DEFS (gradients) ---------- */
const SVG_DEFS = `
<defs>
  <radialGradient id="pepGrad" cx="35%" cy="35%">
    <stop offset="0%" stop-color="#e04a3a" stop-opacity=".4"/>
    <stop offset="100%" stop-color="#8e1a12" stop-opacity=".2"/>
  </radialGradient>
  <radialGradient id="oliveGrad" cx="30%" cy="30%">
    <stop offset="0%" stop-color="#555" stop-opacity=".5"/>
    <stop offset="100%" stop-color="#000" stop-opacity=".3"/>
  </radialGradient>
  <linearGradient id="paneerGrad" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0%" stop-color="#fff" stop-opacity=".2"/>
    <stop offset="100%" stop-color="#d0c8a0" stop-opacity=".15"/>
  </linearGradient>
  <radialGradient id="cheeseGrad" cx="50%" cy="50%">
    <stop offset="0%" stop-color="#f5d080"/>
    <stop offset="70%" stop-color="#e8b840"/>
    <stop offset="100%" stop-color="#d4a030"/>
  </radialGradient>
  <radialGradient id="sauceGrad" cx="50%" cy="50%">
    <stop offset="0%" stop-color="#c03020"/>
    <stop offset="100%" stop-color="#a02818"/>
  </radialGradient>
  <filter id="toppingShadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="1" dy="2" stdDeviation="1.5" flood-opacity=".3"/>
  </filter>
</defs>`;

/* ---------- RENDER PIZZA ---------- */
function renderPizza() {
  const sizeData = SIZES.find((s) => s.id === state.size);
  const crustData = CRUSTS.find((c) => c.id === state.crust);
  const R = sizeData.radius;
  const sauceR = R - 12;
  const cheeseR = R - 18;
  const bakedClass = state.baked ? "baked" : "";

  let toppingsSvg = "";
  state.toppings.forEach((t, i) => {
    const topping = TOPPINGS.find((tp) => tp.id === t.toppingId);
    if (topping) {
      toppingsSvg += `<g class="topping-piece ${bakedClass}" style="animation-delay:${i * 0.06}s" filter="url(#toppingShadow)">${topping.svg(t.x, t.y, t.scale, t.rot)}</g>`;
    }
  });

  const svgContent = `
  <svg viewBox="-${R + 20} -${R + 20} ${(R + 20) * 2} ${(R + 20) * 2}" class="pizza-svg ${bakedClass}" role="img" aria-label="Your custom pizza">
    ${SVG_DEFS}
    <!-- Crust -->
    <circle r="${R}" fill="${crustData.color}" class="crust-circle"/>
    <circle r="${R}" fill="none" stroke="${crustData.edge}" stroke-width="6" opacity=".7"/>
    <circle r="${R - 4}" fill="none" stroke="${crustData.edge}" stroke-width="2" opacity=".3"/>
    <!-- Sauce -->
    <circle r="${sauceR}" fill="url(#sauceGrad)" opacity=".9"/>
    <!-- Cheese -->
    <circle r="${cheeseR}" fill="url(#cheeseGrad)" opacity=".85"/>
    <!-- Cheese texture -->
    <circle r="${cheeseR - 5}" fill="none" stroke="#d4a030" stroke-width=".5" opacity=".3" stroke-dasharray="4 6"/>
    <circle r="${cheeseR - 15}" fill="none" stroke="#c89828" stroke-width=".4" opacity=".2" stroke-dasharray="3 8"/>
    <!-- Toppings -->
    <g class="toppings-layer">${toppingsSvg}</g>
    <!-- Slice lines (subtle) -->
    ${Array.from({ length: sizeData.slices }, (_, i) => {
      const a = (i / sizeData.slices) * Math.PI * 2;
      return `<line x1="0" y1="0" x2="${Math.cos(a) * cheeseR}" y2="${Math.sin(a) * cheeseR}" stroke="#c89830" stroke-width=".6" opacity=".2"/>`;
    }).join("")}
  </svg>`;

  $pizzaStage.innerHTML = svgContent;
  updatePrice();
  updateCount();
}

/* ---------- PRICE ---------- */
function calcPrice() {
  const sizeData = SIZES.find((s) => s.id === state.size);
  const crustData = CRUSTS.find((c) => c.id === state.crust);
  let total = sizeData.basePrice + crustData.price;
  state.toppings.forEach((t) => {
    const tp = TOPPINGS.find((x) => x.id === t.toppingId);
    if (tp) total += tp.price;
  });
  return total;
}

function updatePrice() {
  const price = calcPrice();
  $priceDisplay.textContent = `₹${price}`;
}

function updateCount() {
  const count = state.toppings.length;
  $toppingCount.textContent = count === 0 ? "No toppings yet" : `${count} topping${count > 1 ? "s" : ""}`;
}

/* ---------- ADD TOPPING ---------- */
function addTopping(toppingId, dropX, dropY) {
  const sizeData = SIZES.find((s) => s.id === state.size);
  const R = sizeData.radius;

  let placement;
  if (dropX !== undefined && dropY !== undefined) {
    // Convert drop position to pizza coordinates
    const rect = $pizzaStage.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    let x = dropX - rect.left - cx;
    let y = dropY - rect.top - cy;
    // Clamp to pizza
    const dist = Math.sqrt(x * x + y * y);
    const maxDist = R * 0.75;
    if (dist > maxDist) {
      x = (x / dist) * maxDist;
      y = (y / dist) * maxDist;
    }
    const rot = (Math.random() * 360).toFixed(1);
    const scale = 0.7 + Math.random() * 0.4;
    placement = { id: state.nextId++, toppingId, x, y, rot, scale, seed: Date.now() };
  } else {
    placement = generatePlacement(toppingId, R);
  }

  state.toppings.push(placement);
  state.baked = false;
  renderPizza();

  // Animate the last added topping
  requestAnimationFrame(() => {
    const pieces = $pizzaStage.querySelectorAll(".topping-piece");
    if (pieces.length) {
      const last = pieces[pieces.length - 1];
      last.classList.add("pop-in");
    }
  });
}

/* ---------- REMOVE LAST TOPPING ---------- */
function removeLastTopping() {
  if (state.toppings.length > 0) {
    state.toppings.pop();
    state.baked = false;
    renderPizza();
  }
}

/* ---------- DRAG & DROP (Pointer Events) ---------- */
let dragState = null;

function initDragDrop() {
  $toppingsTray.addEventListener("pointerdown", (e) => {
    const btn = e.target.closest("[data-topping]");
    if (!btn) return;
    e.preventDefault();
    btn.setPointerCapture(e.pointerId);

    const toppingId = btn.dataset.topping;
    const ghost = document.createElement("div");
    ghost.className = "drag-ghost";
    ghost.textContent = TOPPINGS.find((t) => t.id === toppingId)?.emoji || "🟡";
    ghost.style.left = e.clientX + "px";
    ghost.style.top = e.clientY + "px";
    document.body.appendChild(ghost);

    dragState = { toppingId, ghost, pointerId: e.pointerId };
    $dropGlow.classList.add("active");
  });

  document.addEventListener("pointermove", (e) => {
    if (!dragState) return;
    dragState.ghost.style.left = e.clientX + "px";
    dragState.ghost.style.top = e.clientY + "px";
  });

  document.addEventListener("pointerup", (e) => {
    if (!dragState) return;
    const { toppingId, ghost } = dragState;
    ghost.remove();
    $dropGlow.classList.remove("active");

    // Check if dropped on pizza
    const rect = $pizzaStage.getBoundingClientRect();
    if (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    ) {
      addTopping(toppingId, e.clientX, e.clientY);
    }

    dragState = null;
  });

  // Tap-to-add on tray buttons
  $toppingsTray.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-topping]");
    if (!btn) return;
    addTopping(btn.dataset.topping);
  });
}

/* ---------- SIZE / CRUST CONTROLS ---------- */
function initControls() {
  $sizeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.size = btn.dataset.size;
      state.baked = false;
      $sizeBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderPizza();
    });
  });

  $crustBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      state.crust = btn.dataset.crust;
      state.baked = false;
      $crustBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderPizza();
    });
  });

  $resetBtn.addEventListener("click", () => {
    state.toppings = [];
    state.baked = false;
    renderPizza();
  });

  $surpriseBtn.addEventListener("click", () => {
    state.toppings = [];
    state.baked = false;
    const sizeData = SIZES.find((s) => s.id === state.size);
    const count = 5 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const randomTopping = TOPPINGS[Math.floor(Math.random() * TOPPINGS.length)];
      const placement = generatePlacement(randomTopping.id, sizeData.radius);
      state.toppings.push(placement);
    }
    renderPizza();
  });

  $bakeBtn.addEventListener("click", () => {
    state.baked = !state.baked;
    $bakeBtn.textContent = state.baked ? "🔥 Unbake" : "🔥 Bake It!";
    $bakeBtn.classList.toggle("baked-active", state.baked);
    renderPizza();
  });

  $orderBtn.addEventListener("click", () => {
    if (state.toppings.length === 0) {
      $orderBtn.textContent = "Add toppings first!";
      setTimeout(() => ($orderBtn.textContent = "Order Now 🛒"), 1500);
      return;
    }
    const price = calcPrice();
    $orderBtn.textContent = "✓ Ordered! ₹" + price;
    $orderBtn.classList.add("ordered");
    setTimeout(() => {
      $orderBtn.textContent = "Order Now 🛒";
      $orderBtn.classList.remove("ordered");
    }, 2000);
  });
}

/* ---------- INIT ---------- */
function init() {
  renderPizza();
  initDragDrop();
  initControls();

  // Set initial active states
  document.querySelector('[data-size="medium"]')?.classList.add("active");
  document.querySelector('[data-crust="classic"]')?.classList.add("active");
}

document.addEventListener("DOMContentLoaded", init);
