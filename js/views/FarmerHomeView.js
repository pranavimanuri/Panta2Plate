/**
 * Panta2Plate - Farmer Home View
 * Spacious, human-centered dashboard with minimal cognitive load & voice assistance
 */

import { store } from '../store.js';
import { getLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderFarmerHomeView(container) {
  const state = store.getState();
  const lang = getLang();
  const user = state.user;

  // Find if there's any active pickup request for the logged-in farmer
  const incomingPickupListing = state.listings.find(
    l => (l.farmerId === user.uid || l.farmerId === "FARM-01") && l.status === "requested" && l.supplierRequest
  );

  const farmerListings = state.listings.filter(l => l.farmerId === user.uid || l.farmerId === "FARM-01");
  const collectedListings = farmerListings.filter(l => l.status === "collected");
  const totalEarnings = collectedListings.reduce((sum, l) => sum + (l.quantity * l.pricePerKg), 0);

  container.innerHTML = `
    <div class="fade-in-enter">
      <!-- Mandi Market Ticker -->
      <div class="mandi-ticker">
        <div class="mandi-title-wrap">
          <span>📊</span>
          <span>${t("today_mandi_rates")}</span>
        </div>
        <div class="mandi-rates-row">
          <span class="mandi-badge">🍅 టమాటా: ₹28-32/kg</span>
          <span class="mandi-badge">🌶️ మిర్చి: ₹45-52/kg</span>
          <span class="mandi-badge">🧅 ఉల్లి: ₹22-26/kg</span>
        </div>
      </div>

      <!-- Farmer Hero Banner -->
      <div class="farmer-hero-card">
        <div style="display: flex; align-items: flex-start; justify-content: space-between;">
          <div>
            <h2 class="farmer-hero-title">${t("farmer_hero_title")}</h2>
            <p class="farmer-hero-sub">${t("farmer_hero_desc")}</p>
          </div>
          <button class="speaker-btn" id="speakFarmerHeroBtn" style="background: rgba(255,255,255,0.2); color: white; border-color: rgba(255,255,255,0.4);" title="${t('listen_voice')}">
            🔊
          </button>
        </div>

        <!-- Big Primary CTA -->
        <button class="sell-crop-big-btn" id="startListingBtn">
          <span>🌿</span>
          <span>${t("sell_crop_cta")}</span>
        </button>
      </div>

      <!-- Incoming Pickup Request Alert (If Supplier Requested) -->
      ${incomingPickupListing ? `
        <div class="card card-highlight" style="margin-bottom: 20px; border-left: 5px solid var(--primary-600);">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 14px; font-weight: 800; color: var(--primary-800);">
              🚚 ${t("pickup_request_received")}
            </span>
            <span class="scenario-badge">${incomingPickupListing.supplierRequest.eta}</span>
          </div>

          <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.4;">
            <strong>${incomingPickupListing.supplierRequest.supplierName}</strong> మీ <strong>${incomingPickupListing.quantity} kg ${incomingPickupListing.cropName[lang] || incomingPickupListing.cropName.te}</strong> ను <strong>₹${incomingPickupListing.pricePerKg}/kg</strong> ధరకు సేకరించడానికి అభ్యర్థించారు.<br/>
            <span style="font-size: 11px; color: var(--text-muted);">వాహనం: ${incomingPickupListing.supplierRequest.vehicle || "EV Auto"} • సమయం: రేపు ఉదయం 10:00 AM</span>
          </p>

          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" id="acceptPickupBtn" style="flex: 1;">
              ${t("accept_btn")}
            </button>
            <button class="btn btn-danger" id="rejectPickupBtn" style="flex: 1;">
              ${t("reject_btn")}
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Quick Summary Stats -->
      <div class="stats-grid">
        <div class="stat-box">
          <div class="stat-number">${farmerListings.length}</div>
          <div class="stat-label">${t("stat_listed")}</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">${collectedListings.length}</div>
          <div class="stat-label">${t("stat_collected")}</div>
        </div>
        <div class="stat-box">
          <div class="stat-number">₹${totalEarnings > 0 ? totalEarnings.toLocaleString() : "3,000"}</div>
          <div class="stat-label">${t("stat_earnings")}</div>
        </div>
      </div>

      <!-- Active Crop Listings Section -->
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
        <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${t("active_listings_title")}</h3>
        <span style="font-size: 12px; font-weight: 700; color: var(--primary-700);">${farmerListings.length} పంటలు</span>
      </div>

      <div class="listings-feed">
        ${farmerListings.map(listing => `
          <div class="listing-card-item">
            <img src="${listing.image}" alt="Crop" class="listing-thumb-img" onerror="this.src='assets/tomatoes.jpg'" />
            <div class="listing-info">
              <div class="listing-title-row">
                <span class="listing-crop-title">${listing.cropName[lang] || listing.cropName.te}</span>
                <span class="distance-tag" style="background: ${listing.status === 'collected' ? '#dcfce7' : listing.status === 'requested' ? '#fef3c7' : '#eef8f2'}; color: ${listing.status === 'collected' ? '#166534' : listing.status === 'requested' ? '#92400e' : '#127f44'};">
                  ${listing.status === 'collected' ? t('completed') : listing.status === 'requested' ? t('pending') : t('active')}
                </span>
              </div>
              <div class="listing-meta-row">
                <span>📦 ${listing.quantity} kg</span>
                <span>•</span>
                <span>🌱 Grade ${listing.grade || 'A'} (${listing.variety})</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px;">
                <span class="price-highlight">₹${listing.pricePerKg} <span style="font-size: 12px; font-weight: 500; color: var(--text-muted);">/kg</span></span>
                <span style="font-size: 11px; color: var(--text-muted);">${listing.harvestDate}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  // Event Listeners
  container.querySelector('#startListingBtn')?.addEventListener('click', () => {
    store.setView('farmer_wizard');
    speakPrompt(`${t('step1_title')}. ${t('step1_sub')}`);
  });

  container.querySelector('#speakFarmerHeroBtn')?.addEventListener('click', () => {
    speakPrompt(`${t('farmer_hero_title')}. ${t('farmer_hero_desc')}`);
  });

  if (incomingPickupListing) {
    container.querySelector('#acceptPickupBtn')?.addEventListener('click', () => {
      store.handlePickupResponse(incomingPickupListing.id, true);
      speakPrompt(t("pickup_accepted_msg"));
    });

    container.querySelector('#rejectPickupBtn')?.addEventListener('click', () => {
      store.handlePickupResponse(incomingPickupListing.id, false);
      speakPrompt(t("cancel_btn"));
    });
  }
}
