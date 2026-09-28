/**
 * Panta2Plate - Main Application Controller & Router
 */

import { store } from './store.js';
import { getLang, setLang } from './i18n.js';
import { renderTopDemoBar } from './components/TopDemoBar.js';
import { renderHeader } from './components/Header.js';
import { renderBottomNav } from './components/BottomNav.js';
import { initSpeechBubble } from './components/SpeechBubble.js';
import { initToastSystem } from './components/Toast.js';

// Views
import { renderOnboardingView } from './views/OnboardingView.js';
import { renderFarmerHomeView } from './views/FarmerHomeView.js';
import { renderFarmerListingWizardView } from './views/FarmerListingWizardView.js';
import { renderFarmerListingsView } from './views/FarmerListingsView.js';
import { renderSupplierDashboardView } from './views/SupplierDashboardView.js';
import { renderSupplierInventoryView } from './views/SupplierInventoryView.js';
import { renderRestaurantMarketView } from './views/RestaurantMarketView.js';
import { renderRestaurantOrderTrackingView } from './views/RestaurantOrderTrackingView.js';

class App {
  constructor() {
    this.topBarContainer = document.getElementById('demoTopBarContainer');
    this.headerContainer = document.getElementById('appHeaderContainer');
    this.screenContainer = document.getElementById('appScreenContainer');
    this.bottomNavContainer = document.getElementById('bottomNavContainer');
    this.speechOverlayContainer = document.getElementById('speechOverlayContainer');
    this.toastContainer = document.getElementById('toastContainer');

    this.init();
  }

  init() {
    // Initialize speech bubble overlay & toast
    initSpeechBubble(this.speechOverlayContainer);
    initToastSystem(this.toastContainer);

    // Initial render
    this.renderAll();

    // Subscribe to state changes
    store.subscribe(() => {
      this.renderAll();
    });

    // Subscribe to language changes
    window.addEventListener("panta:lang_changed", () => {
      this.renderAll();
    });

    // Voice speaking state animation
    window.addEventListener("panta:speech_state", (e) => {
      const isSpeaking = e.detail?.speaking;
      document.querySelectorAll('.speaker-btn').forEach(btn => {
        if (isSpeaking) {
          btn.classList.add('speaking');
        } else {
          btn.classList.remove('speaking');
        }
      });
    });
  }

  renderAll() {
    const state = store.getState();

    // Render Top Demo Bar
    renderTopDemoBar(this.topBarContainer);

    // Render App Header (Only if not onboarding)
    if (state.currentView === 'onboarding') {
      this.headerContainer.style.display = 'none';
    } else {
      this.headerContainer.style.display = 'block';
      renderHeader(this.headerContainer);
    }

    // Render Active View
    this.renderCurrentView(state.currentView);

    // Render Bottom Navigation
    renderBottomNav(this.bottomNavContainer);
  }

  renderCurrentView(viewName) {
    this.screenContainer.innerHTML = '';

    switch (viewName) {
      case 'onboarding':
        renderOnboardingView(this.screenContainer);
        break;
      case 'farmer_home':
        renderFarmerHomeView(this.screenContainer);
        break;
      case 'farmer_wizard':
        renderFarmerListingWizardView(this.screenContainer);
        break;
      case 'farmer_listings':
        renderFarmerListingsView(this.screenContainer);
        break;
      case 'supplier_dashboard':
        renderSupplierDashboardView(this.screenContainer);
        break;
      case 'supplier_inventory':
        renderSupplierInventoryView(this.screenContainer);
        break;
      case 'restaurant_market':
        renderRestaurantMarketView(this.screenContainer);
        break;
      case 'restaurant_tracking':
        renderRestaurantOrderTrackingView(this.screenContainer);
        break;
      default:
        renderFarmerHomeView(this.screenContainer);
        break;
    }
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.pantaApp = new App();
});
