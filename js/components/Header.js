/**
 * Panta2Plate - App Header Component
 * Shows current authenticated user, GPS location, voice guidance button, and logout / profile action
 */

import { store } from '../store.js';
import { t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderHeader(container) {
  const state = store.getState();
  const role = state.currentRole;
  const user = state.user;

  let userInfo = {
    name: user.name || "రామయ్య (Ramayya)",
    sub: state.userLocation.permissionGranted ? state.userLocation.address : (user.village || user.location?.name || "చేవెళ్ళ, రంగారెడ్డి"),
    avatar: user.avatar || "assets/farmer_ramayya.jpg"
  };

  if (role === 'supplier') {
    userInfo = {
      name: state.supplierInfo.name.split('(')[0],
      sub: "హైదరాబాద్ లాజిస్టిక్స్ రూట్",
      avatar: state.supplierInfo.avatar
    };
  } else if (role === 'restaurant') {
    userInfo = {
      name: state.restaurantInfo.name.split('(')[0],
      sub: state.restaurantInfo.location?.name || "మాదాపూర్, హైటెక్ సిటీ",
      avatar: state.restaurantInfo.avatar
    };
  }

  container.innerHTML = `
    <header class="app-header">
      <div class="header-user-info" style="cursor: pointer;" id="headerUserProfile">
        <img src="${userInfo.avatar}" alt="User Avatar" class="user-avatar-img" onerror="this.src='assets/farmer_ramayya.jpg'" />
        <div class="header-meta">
          <h2>${userInfo.name}</h2>
          <p>📍 ${userInfo.sub}</p>
        </div>
      </div>

      <div class="header-actions">
        <button class="speaker-btn" id="headerSpeakBtn" title="${t('listen_voice')}">
          🔊
        </button>
        <button class="btn btn-secondary btn-icon" id="headerLogoutBtn" title="Logout / Switch Account" style="min-height: 40px; height: 40px; width: 40px; font-size: 14px; border-radius: var(--radius-full);">
          🚪
        </button>
      </div>
    </header>
  `;

  // Attach speech trigger
  container.querySelector('#headerSpeakBtn')?.addEventListener('click', () => {
    if (role === 'farmer') {
      speakPrompt(`${t('farmer_greeting')}. ${t('farmer_hero_desc')}`);
    } else if (role === 'supplier') {
      speakPrompt(`${t('supplier_dashboard_title')}. ${t('nearby_farmers_title')}`);
    } else {
      speakPrompt(`${t('restaurant_dashboard_title')}. ${t('compare_tag')}`);
    }
  });

  // Attach logout trigger
  container.querySelector('#headerLogoutBtn')?.addEventListener('click', () => {
    store.logout();
    speakPrompt("లాగౌట్ విజయవంతమైంది. దయచేసి మీ పాత్రను ఎంచుకోండి.");
  });
}
