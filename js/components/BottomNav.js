/**
 * Panta2Plate - Bottom Navigation Component
 */

import { store } from '../store.js';
import { t } from '../i18n.js';

export function renderBottomNav(container) {
  const state = store.getState();
  const role = state.currentRole;
  const view = state.currentView;

  if (view === 'onboarding') {
    container.innerHTML = '';
    return;
  }

  let navItems = [];

  if (role === 'farmer') {
    navItems = [
      { id: 'farmer_home', label: t('nav_home'), icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>` },
      { id: 'farmer_wizard', label: t('sell_crop_cta').split('(')[0].trim(), icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>` },
      { id: 'farmer_listings', label: t('nav_listings'), icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>` }
    ];
  } else if (role === 'supplier') {
    navItems = [
      { id: 'supplier_dashboard', label: t('nearby_farmers_title').split(' ')[0], icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>` },
      { id: 'supplier_inventory', label: t('nav_inventory'), icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>` }
    ];
  } else {
    navItems = [
      { id: 'restaurant_market', label: t('nav_market'), icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>` },
      { id: 'restaurant_tracking', label: t('orders'), icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>` }
    ];
  }

  container.innerHTML = `
    <nav class="bottom-nav">
      ${navItems.map(item => `
        <button class="nav-item ${view === item.id ? 'active' : ''}" data-view="${item.id}">
          ${item.icon}
          <span>${item.label}</span>
        </button>
      `).join('')}
    </nav>
  `;

  container.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetView = btn.dataset.view;
      store.setView(targetView);
    });
  });
}
