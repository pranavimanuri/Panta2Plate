/**
 * Panta2Plate - Farmer Listings View (My Crops & Requests)
 */

import { store } from '../store.js';
import { getLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderFarmerListingsView(container) {
  const state = store.getState();
  const lang = getLang();
  const user = state.user;
  const farmerListings = state.listings.filter(l => l.farmerId === user.uid || l.farmerId === "FARM-01");

  container.innerHTML = `
    <div class="fade-in-enter">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">${t("nav_listings")}</h2>
          <p style="font-size: 13px; color: var(--text-muted);">మీరు నమోదు చేసిన పంటల స్థితి</p>
        </div>
        <button class="speaker-btn" id="speakListingsBtn" title="${t('listen_voice')}">🔊</button>
      </div>

      <div class="listings-feed">
        ${farmerListings.map(listing => `
          <div class="card" style="margin-bottom: 14px; border: 1.5px solid var(--border-light);">
            <div style="display: flex; gap: 14px;">
              <img src="${listing.image}" alt="Crop" class="listing-thumb-img" onerror="this.src='assets/tomatoes.jpg'" />
              <div style="flex: 1;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${listing.cropName[lang] || listing.cropName.te}</h3>
                  <span class="distance-tag" style="background: ${listing.status === 'collected' ? '#dcfce7' : listing.status === 'requested' ? '#fef3c7' : '#eef8f2'}; color: ${listing.status === 'collected' ? '#166534' : listing.status === 'requested' ? '#92400e' : '#127f44'};">
                    ${listing.status === 'collected' ? t('completed') : listing.status === 'requested' ? t('pending') : t('active')}
                  </span>
                </div>
                <div style="font-size: 13px; color: var(--text-secondary); margin: 4px 0;">
                  పరిమాణం: <strong>${listing.quantity} kg</strong> • Grade ${listing.grade || 'A'} (${listing.variety})
                </div>
                <div class="price-highlight">₹${listing.pricePerKg} /kg</div>
              </div>
            </div>

            <!-- If Pickup Requested -->
            ${listing.status === 'requested' && listing.supplierRequest ? `
              <div style="background: #fef3c7; border-radius: var(--radius-md); padding: 12px; margin-top: 12px; border: 1px solid #fde68a;">
                <div style="font-size: 13px; font-weight: 700; color: #92400e; margin-bottom: 4px;">
                  🚚 పికప్ అభ్యర్థన: ${listing.supplierRequest.supplierName}
                </div>
                <div style="font-size: 12px; color: #78350f; margin-bottom: 8px;">
                  సమయం: ${listing.supplierRequest.eta} • మొత్తం: ₹${(listing.quantity * listing.pricePerKg).toLocaleString()}
                </div>
                <div style="display: flex; gap: 8px;">
                  <button class="btn btn-primary" style="flex: 1; min-height: 44px; padding: 6px 12px; font-size: 14px;" id="acceptBtn-${listing.id}">
                    ${t("accept_btn")}
                  </button>
                  <button class="btn btn-danger" style="flex: 1; min-height: 44px; padding: 6px 12px; font-size: 14px;" id="rejectBtn-${listing.id}">
                    ${t("reject_btn")}
                  </button>
                </div>
              </div>
            ` : ''}

            <!-- If Collected -->
            ${listing.status === 'collected' ? `
              <div style="background: #f0fdf4; border-radius: var(--radius-md); padding: 10px 12px; margin-top: 12px; border: 1px solid #bbf7d0; font-size: 12px; color: #166534; font-weight: 600;">
                ✅ పంట విజయవంతంగా సేకరించబడింది. చెల్లింపు ఖాతాలో జమయింది.
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>

      <button class="btn btn-primary btn-full btn-lg" id="addNewListingBtn" style="margin-top: 16px;">
        🌿 ${t("sell_crop_cta")}
      </button>
    </div>
  `;

  container.querySelector('#speakListingsBtn')?.addEventListener('click', () => {
    speakPrompt(`మీరు ${farmerListings.length} పంటలు నమోదు చేశారు.`);
  });

  container.querySelector('#addNewListingBtn')?.addEventListener('click', () => {
    store.setView('farmer_wizard');
  });

  farmerListings.forEach(listing => {
    container.querySelector(`#acceptBtn-${listing.id}`)?.addEventListener('click', () => {
      store.handlePickupResponse(listing.id, true);
    });
    container.querySelector(`#rejectBtn-${listing.id}`)?.addEventListener('click', () => {
      store.handlePickupResponse(listing.id, false);
    });
  });
}
