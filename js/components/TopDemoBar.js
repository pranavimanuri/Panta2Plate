/**
 * Panta2Plate - Top Presentation & Demo Toolbar
 * Empowers judges & presenters to inspect any role or advance the live hackathon flow with 1-click
 */

import { store } from '../store.js';
import { getLang, setLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderTopDemoBar(container) {
  const state = store.getState();
  const lang = getLang();

  const demoSteps = [
    { step: 1, role: "farmer", view: "farmer_wizard", label: t("demo_step_1") },
    { step: 2, role: "supplier", view: "supplier_dashboard", label: t("demo_step_2") },
    { step: 3, role: "farmer", view: "farmer_home", label: t("demo_step_3") },
    { step: 4, role: "supplier", view: "supplier_inventory", label: t("demo_step_4") },
    { step: 5, role: "restaurant", view: "restaurant_market", label: t("demo_step_5") },
    { step: 6, role: "supplier", view: "supplier_inventory", label: t("demo_step_6") }
  ];

  const currentDemoStep = state.demoStep || 0;
  const activeStepObj = demoSteps[Math.min(currentDemoStep, demoSteps.length - 1)] || demoSteps[0];

  container.innerHTML = `
    <div class="demo-top-bar">
      <div class="demo-brand">
        <div class="demo-logo-badge">🌾</div>
        <div class="demo-title-group">
          <h1>${t("app_name")}</h1>
          <p>${t("tagline")}</p>
        </div>
      </div>

      <div class="demo-controls">
        <!-- Role Switcher -->
        <div class="role-pills">
          <button class="role-pill-btn ${state.currentRole === 'farmer' ? 'active' : ''}" data-role="farmer">
            🧑‍🌾 ${t("role_farmer").split(' ')[0]}
          </button>
          <button class="role-pill-btn ${state.currentRole === 'supplier' ? 'active' : ''}" data-role="supplier">
            🚚 ${t("role_supplier").split(' ')[0]}
          </button>
          <button class="role-pill-btn ${state.currentRole === 'restaurant' ? 'active' : ''}" data-role="restaurant">
            🍽️ ${t("role_restaurant").split(' ')[0]}
          </button>
        </div>

        <!-- Language Selector -->
        <div class="lang-selector">
          <button class="lang-btn ${lang === 'te' ? 'active' : ''}" data-lang="te">తెలుగు</button>
          <button class="lang-btn ${lang === 'hi' ? 'active' : ''}" data-lang="hi">हिन्दी</button>
          <button class="lang-btn ${lang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
        </div>

        <!-- Reset Button -->
        <button class="scenario-action-btn" id="resetDemoBtn" title="Reset Demo Data">
          🔄 ${t("reset_demo_btn")}
        </button>
      </div>

      <!-- Live Scenario Step Bar -->
      <div class="scenario-banner">
        <div class="scenario-step-text">
          <span class="scenario-badge">Demo Step ${Math.min(currentDemoStep + 1, 6)}/6</span>
          <span>${activeStepObj.label}</span>
        </div>
        <div class="scenario-nav-btns">
          <button class="scenario-action-btn" id="autoAdvanceStepBtn">
            ⚡ Next Step ▶
          </button>
        </div>
      </div>
    </div>
  `;

  // Attach Event Listeners
  container.querySelectorAll('.role-pill-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      store.setRole(role);
    });
  });

  container.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const selectedLang = btn.dataset.lang;
      setLang(selectedLang);
    });
  });

  container.querySelector('#resetDemoBtn')?.addEventListener('click', () => {
    store.resetDemo();
    speakPrompt(t("farmer_greeting"));
  });

  container.querySelector('#autoAdvanceStepBtn')?.addEventListener('click', () => {
    advanceDemoScenario();
  });
}

export function advanceDemoScenario() {
  const state = store.getState();
  const currentStep = state.demoStep || 0;

  if (currentStep === 0) {
    // Go to Farmer Wizard
    store.setRole("farmer");
    store.setView("farmer_wizard");
  } else if (currentStep === 1) {
    // Supplier discovers and sends pickup request
    store.setRole("supplier");
    store.setView("supplier_dashboard");
    const tomatoListing = state.listings.find(l => l.cropKey === 'tomato' && l.status === 'active');
    if (tomatoListing) {
      store.sendPickupRequest(tomatoListing.id);
    }
  } else if (currentStep === 2) {
    // Farmer accepts pickup request
    store.setRole("farmer");
    store.setView("farmer_home");
    const tomatoListing = state.listings.find(l => l.cropKey === 'tomato');
    if (tomatoListing) {
      store.handlePickupResponse(tomatoListing.id, true);
    }
  } else if (currentStep === 3) {
    // Supplier collects and adds to inventory @ ₹32
    store.setRole("supplier");
    store.setView("supplier_inventory");
    const tomatoListing = state.listings.find(l => l.cropKey === 'tomato');
    if (tomatoListing) {
      store.collectAndAddToInventory(tomatoListing.id, 32);
    }
  } else if (currentStep === 4) {
    // Restaurant orders 50kg tomatoes
    store.setRole("restaurant");
    store.setView("restaurant_market");
    store.placeOrder("tomato", 50);
  } else if (currentStep === 5) {
    // Supplier delivers
    store.setRole("supplier");
    store.setView("supplier_inventory");
    const pendingOrder = state.orders[0];
    if (pendingOrder) {
      store.updateOrderStatus(pendingOrder.id, "out_for_delivery");
      setTimeout(() => {
        store.updateOrderStatus(pendingOrder.id, "delivered");
      }, 1200);
    }
  } else {
    // Finished - cycle to restaurant tracking or reset
    store.setRole("restaurant");
    store.setView("restaurant_tracking");
  }
}
