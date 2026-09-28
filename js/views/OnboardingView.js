/**
 * Panta2Plate - Onboarding, Role Selection & Geolocation Permission View
 */

import { store } from '../store.js';
import { getLang, setLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderOnboardingView(container) {
  let step = 1; // 1: Language, 2: Location Permission, 3: Role & Quick Login
  let selectedRole = "farmer";
  let enteredPhone = "+91 98480 12345";
  let locationStatus = "pending"; // 'pending' | 'granted' | 'denied'

  function render() {
    const currentLanguage = getLang();

    // -------------------------------------------------------------
    // Step 1: Language Selection
    // -------------------------------------------------------------
    if (step === 1) {
      container.innerHTML = `
        <div class="onboarding-container fade-in-enter">
          <div class="brand-splash-header">
            <div class="brand-icon-large">🌾</div>
            <h1>${t("app_name")}</h1>
            <p>${t("tagline")}</p>
          </div>

          <div class="card card-warm" style="margin-top: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <div>
                <h3 style="font-size: 18px; font-weight: 800; color: var(--primary-900);">${t("choose_language")}</h3>
                <p style="font-size: 12px; color: var(--text-muted);">${t("choose_language_sub")}</p>
              </div>
              <button class="speaker-btn" id="speakLangPrompt" title="${t('listen_voice')}">🔊</button>
            </div>

            <div class="lang-select-grid">
              <div class="lang-big-card ${currentLanguage === 'te' ? 'active' : ''}" data-lang="te">
                <span class="lang-native-text">తెలుగు</span>
                <span class="lang-sub-text">Telugu</span>
              </div>
              <div class="lang-big-card ${currentLanguage === 'hi' ? 'active' : ''}" data-lang="hi">
                <span class="lang-native-text">हिन्दी</span>
                <span class="lang-sub-text">Hindi</span>
              </div>
              <div class="lang-big-card ${currentLanguage === 'en' ? 'active' : ''}" data-lang="en">
                <span class="lang-native-text">English</span>
                <span class="lang-sub-text">English</span>
              </div>
            </div>

            <button class="btn btn-primary btn-full btn-lg" id="continueFromLangBtn" style="margin-top: 16px;">
              ${t("next_btn")} ➔
            </button>
          </div>
        </div>
      `;

      container.querySelector('#speakLangPrompt')?.addEventListener('click', () => {
        speakPrompt("దయచేసి మీ భాషను ఎంచుకోండి. తెలుగు, హిందీ లేదా ఇంగ్లీష్.");
      });

      container.querySelectorAll('.lang-big-card').forEach(card => {
        card.addEventListener('click', () => {
          const lang = card.dataset.lang;
          setLang(lang);
          render();
        });
      });

      container.querySelector('#continueFromLangBtn')?.addEventListener('click', () => {
        step = 2; // Move to location permission
        render();
        speakPrompt("సమీపంలోని సరఫరాదారులను కనుగొనడానికి లొకేషన్ అనుమతించండి.");
      });

    } 
    // -------------------------------------------------------------
    // Step 2: Location Permission Check
    // -------------------------------------------------------------
    else if (step === 2) {
      const userLoc = store.getState().userLocation;

      container.innerHTML = `
        <div class="onboarding-container fade-in-enter">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <button class="btn btn-secondary btn-icon" id="backToLangBtn" style="min-height: 42px; height: 42px; width: 42px;">
              ◀
            </button>
            <div>
              <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">లొకేషన్ అనుమతి</h2>
              <p style="font-size: 13px; color: var(--text-muted);">సమీప సప్లయర్లు & మార్కెట్ దూరం కోసం</p>
            </div>
          </div>

          <div class="card card-warm" style="text-align: center; padding: 24px 16px;">
            <div style="font-size: 48px; margin-bottom: 12px;">📍</div>
            <h3 style="font-size: 17px; font-weight: 800; color: var(--text-primary); margin-bottom: 6px;">
              సమీప సప్లయర్లను కనుగొనడానికి లొకేషన్ అవసరం
            </h3>
            <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 18px;">
              మీ పొలానికి సమీపంలో ఉన్న సరఫరాదారులను సరిపోల్చడానికి మరియు పికప్ సమయాన్ని ఖచ్చితంగా లెక్కించడానికి మీ బ్రౌజర్ లొకేషన్ ఉపయోగపడుతుంది.
            </p>

            ${locationStatus === 'granted' ? `
              <div style="background: #dcfce7; border: 1.5px solid #86efac; border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; font-size: 13px; font-weight: 700; color: #166534;">
                ✅ లొకేషన్ విజయవంతంగా గుర్తించబడింది: ${userLoc.address}
              </div>
            ` : locationStatus === 'denied' ? `
              <div style="background: #fee2e2; border: 1.5px solid #fca5a5; border-radius: var(--radius-md); padding: 12px; margin-bottom: 16px; font-size: 13px; color: #991b1b; line-height: 1.4;">
                ⚠️ లొకేషన్ అనుమతి మంజూరు కాలేదు. మీరు డిఫాల్ట్ లొకేషన్ (చేవెళ్ళ) తో కొనసాగవచ్చు.
              </div>
            ` : ''}

            <div style="display: flex; flex-direction: column; gap: 10px;">
              <button class="btn btn-primary btn-full btn-lg" id="allowGpsBtn">
                📍 లొకేషన్ అనుమతించండి (Allow GPS)
              </button>
              <button class="btn btn-secondary btn-full" id="skipGpsBtn">
                తర్వాత చేస్తాను (Continue Manually)
              </button>
            </div>
          </div>
        </div>
      `;

      container.querySelector('#backToLangBtn')?.addEventListener('click', () => {
        step = 1;
        render();
      });

      container.querySelector('#allowGpsBtn')?.addEventListener('click', async () => {
        const btn = container.querySelector('#allowGpsBtn');
        btn.innerText = "గుర్తిస్తోంది...";
        const loc = await store.requestLocationPermission();
        if (loc.permissionGranted) {
          locationStatus = 'granted';
          render();
          setTimeout(() => {
            step = 3;
            render();
            speakPrompt(t("select_role"));
          }, 800);
        } else {
          locationStatus = 'denied';
          render();
        }
      });

      container.querySelector('#skipGpsBtn')?.addEventListener('click', () => {
        step = 3;
        render();
        speakPrompt(t("select_role"));
      });
    }
    // -------------------------------------------------------------
    // Step 3: Role Selection & Real Authentication Login
    // -------------------------------------------------------------
    else {
      container.innerHTML = `
        <div class="onboarding-container fade-in-enter">
          <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 8px;">
            <button class="btn btn-secondary btn-icon" id="backToGpsBtn" style="min-height: 42px; height: 42px; width: 42px;">
              ◀
            </button>
            <div>
              <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">${t("select_role")}</h2>
              <p style="font-size: 13px; color: var(--text-muted);">${t("select_role_sub")}</p>
            </div>
          </div>

          <div class="role-cards-stack">
            <!-- Farmer -->
            <div class="role-card-item ${selectedRole === 'farmer' ? 'selected' : ''}" data-role="farmer">
              <div class="role-avatar-circle">🧑‍🌾</div>
              <div class="role-card-info">
                <h3>${t("role_farmer")}</h3>
                <p>${t("role_farmer_desc")}</p>
              </div>
            </div>

            <!-- Supplier -->
            <div class="role-card-item ${selectedRole === 'supplier' ? 'selected' : ''}" data-role="supplier">
              <div class="role-avatar-circle">🚚</div>
              <div class="role-card-info">
                <h3>${t("role_supplier")}</h3>
                <p>${t("role_supplier_desc")}</p>
              </div>
            </div>

            <!-- Restaurant -->
            <div class="role-card-item ${selectedRole === 'restaurant' ? 'selected' : ''}" data-role="restaurant">
              <div class="role-avatar-circle">🍽️</div>
              <div class="role-card-info">
                <h3>${t("role_restaurant")}</h3>
                <p>${t("role_restaurant_desc")}</p>
              </div>
            </div>
          </div>

          <!-- Phone Number Login Box -->
          <div class="card" style="margin-top: 14px; background: white; border: 1.5px solid var(--border-light);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 13px; font-weight: 700; color: var(--text-secondary);">${t("enter_phone")}</span>
              <span style="font-size: 11px; font-weight: 700; color: var(--primary-600);">${t("verified_farmer")}</span>
            </div>
            
            <input type="text" id="loginPhoneInput" value="${selectedRole === 'farmer' ? '+91 98480 12345' : selectedRole === 'supplier' ? '+91 98765 43210' : '+91 98490 99887'}" class="search-input-field" style="margin-bottom: 12px; font-weight: 700;" />
            
            <button class="btn btn-primary btn-full btn-lg" id="quickLoginBtn">
              ${t("quick_demo_login")} ➔
            </button>
          </div>
        </div>
      `;

      container.querySelector('#backToGpsBtn')?.addEventListener('click', () => {
        step = 2;
        render();
      });

      container.querySelectorAll('.role-card-item').forEach(card => {
        card.addEventListener('click', () => {
          selectedRole = card.dataset.role;
          render();
        });
      });

      container.querySelector('#quickLoginBtn')?.addEventListener('click', () => {
        const phone = container.querySelector('#loginPhoneInput')?.value;
        store.loginAs(selectedRole, phone);
        if (selectedRole === 'farmer') {
          speakPrompt(`${t('farmer_greeting')}. ${t('farmer_hero_desc')}`);
        } else if (selectedRole === 'supplier') {
          speakPrompt(t('supplier_dashboard_title'));
        } else {
          speakPrompt(t('restaurant_dashboard_title'));
        }
      });
    }
  }

  render();
}
