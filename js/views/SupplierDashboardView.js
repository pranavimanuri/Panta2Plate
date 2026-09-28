/**
 * Panta2Plate - Supplier Dashboard View (Radar Discovery & Pickup Request System)
 */

import { store, calculateDistanceKm } from '../store.js';
import { getLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderSupplierDashboardView(container) {
  const state = store.getState();
  const lang = getLang();
  const supplier = state.supplierInfo;
  const userLoc = state.userLocation;

  let searchQuery = "";
  let selectedFilter = "all";
  let pickupModalListing = null;

  function render() {
    const activeListings = state.listings.filter(listing => {
      // Filter by category
      if (selectedFilter !== "all" && listing.cropKey !== selectedFilter) {
        return false;
      }
      // Filter by search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const cropNameStr = (listing.cropName[lang] || listing.cropName.te || "").toLowerCase();
        const farmerNameStr = (listing.farmerName || "").toLowerCase();
        const villageStr = (listing.farmerVillage || "").toLowerCase();
        return cropNameStr.includes(q) || farmerNameStr.includes(q) || villageStr.includes(q);
      }
      return true;
    });

    // Supplier coordinates
    const supLat = userLoc.permissionGranted ? userLoc.lat : (supplier.location?.lat || 17.3616);
    const supLng = userLoc.permissionGranted ? userLoc.lng : (supplier.location?.lng || 78.4747);

    container.innerHTML = `
      <div class="fade-in-enter">
        <!-- Radar Discovery Map Card -->
        <div class="supplier-map-card">
          <div style="display: flex; align-items: flex-start; justify-content: space-between;">
            <div>
              <div class="radar-sweep-icon">📡</div>
              <h2 style="font-size: 20px; font-weight: 800; line-height: 1.2;">
                ${t("nearby_farmers_title")}
              </h2>
              <p style="font-size: 12px; opacity: 0.85; margin-top: 4px;">
                📍 చేవెళ్ళ & శంషాబాద్ రూట్ • GPS లైవ్ రాడార్
              </p>
            </div>
            <button class="speaker-btn" id="speakSupplierBtn" style="background: rgba(255,255,255,0.2); color: white; border-color: rgba(255,255,255,0.4);" title="${t('listen_voice')}">
              🔊
            </button>
          </div>

          <div style="display: flex; gap: 8px; margin-top: 14px; overflow-x: auto;">
            <span class="scenario-badge" style="background: rgba(255,255,255,0.2);">🌱 ${activeListings.length} పంటలు అందుబాటులో ఉన్నాయి</span>
            <span class="scenario-badge" style="background: rgba(46, 204, 113, 0.3);">⚡ తక్షణ పికప్</span>
          </div>
        </div>

        <!-- Search & Filters -->
        <div class="search-filter-bar">
          <div class="search-input-wrap">
            <span class="search-icon-pos">🔍</span>
            <input type="text" id="farmerSearchInput" class="search-input-field" value="${searchQuery}" placeholder="${t('search_farmers_placeholder')}" />
          </div>
        </div>

        <!-- Filter Chips -->
        <div class="quick-chips-row" style="margin-bottom: 14px;">
          <button class="quick-chip ${selectedFilter === 'all' ? 'active' : ''}" data-filter="all">${t("filter_all")}</button>
          <button class="quick-chip ${selectedFilter === 'tomato' ? 'active' : ''}" data-filter="tomato">🍅 ${t("filter_tomatoes")}</button>
          <button class="quick-chip ${selectedFilter === 'chilli' ? 'active' : ''}" data-filter="chilli">🌶️ ${t("filter_chillies")}</button>
          <button class="quick-chip ${selectedFilter === 'onion' ? 'active' : ''}" data-filter="onion">🧅 ${t("filter_onions")}</button>
        </div>

        <!-- Farmer Listings Feed -->
        <div style="margin-top: 12px;">
          ${activeListings.length === 0 ? `
            <div class="card" style="text-align: center; padding: 24px; color: var(--text-muted);">
              ఈ శోధనకు సరిపోయే పంటలు కనుగొనబడలేదు.
            </div>
          ` : activeListings.map(listing => {
            const fLat = listing.location?.lat || 17.3105;
            const fLng = listing.location?.lng || 78.1340;
            const distKm = calculateDistanceKm(supLat, supLng, fLat, fLng);

            return `
              <div class="nearby-farmer-item">
                <div class="nearby-header-row">
                  <div class="farmer-tag">
                    <span>🧑‍🌾</span>
                    <span>${listing.farmerName} (${listing.farmerVillage})</span>
                  </div>
                  <span class="distance-tag">📍 ${distKm} ${t('distance_km')}</span>
                </div>

                <div style="display: flex; gap: 12px; margin-bottom: 12px;">
                  <img src="${listing.image}" alt="Produce" class="listing-thumb-img" onerror="this.src='assets/tomatoes.jpg'" />
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">
                        ${listing.cropName[lang] || listing.cropName.te}
                      </h3>
                      <span class="scenario-badge" style="background: var(--primary-700);">Grade ${listing.grade || 'A'}</span>
                    </div>
                    <p style="font-size: 13px; color: var(--text-muted); margin: 2px 0;">
                      లభ్యత: <strong>${listing.quantity} kg</strong> (${listing.variety})
                    </p>
                    <div class="price-highlight">
                      ₹${listing.pricePerKg} <span style="font-size: 12px; font-weight: 500; color: var(--text-muted);">/kg (రైతు ధర)</span>
                    </div>
                  </div>
                </div>

                <!-- Action Button / Status -->
                ${listing.status === 'active' ? `
                  <button class="btn btn-primary btn-full" id="openPickupModalBtn-${listing.id}">
                    ${t("send_pickup_request_btn")}
                  </button>
                ` : listing.status === 'requested' ? `
                  <div style="background: #fef3c7; border-radius: var(--radius-md); padding: 10px 14px; display: flex; align-items: center; justify-content: space-between; border: 1px solid #fde68a;">
                    <span style="font-size: 13px; font-weight: 700; color: #92400e;">
                      ⏳ ${listing.supplierRequest?.status === 'accepted' ? 'రైతు అంగీకరించారు! (Accepted)' : 'రైతు స్పందన కోసం వేచి ఉంది...'}
                    </span>
                    ${listing.supplierRequest?.status === 'accepted' ? `
                      <button class="btn btn-accent" id="collectBtn-${listing.id}" style="min-height: 40px; padding: 6px 14px; font-size: 13px;">
                        ${t("mark_collected_btn")}
                      </button>
                    ` : ''}
                  </div>
                ` : `
                  <div style="background: #dcfce7; border-radius: var(--radius-md); padding: 10px 14px; text-align: center; font-size: 13px; font-weight: 700; color: #166534;">
                    ✅ సేకరించబడింది & ఇన్వెంటరీలో చేర్చబడింది
                  </div>
                `}
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Send Pickup Request Modal -->
      ${pickupModalListing ? `
        <div class="modal-overlay" id="pickupModalOverlay">
          <div class="bottom-sheet">
            <div class="sheet-handle"></div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">🚚 పికప్ అభ్యర్థన షెడ్యూల్</h3>
              <button class="speech-bubble-close" id="closePickupModalBtn" style="color: var(--text-muted); font-size: 20px;">✕</button>
            </div>

            <div class="card card-warm" style="margin-bottom: 14px; border: 1.5px solid var(--border-light);">
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">రైతు (Farmer):</span>
                <strong>${pickupModalListing.farmerName}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">పంట (Product):</span>
                <strong>${pickupModalListing.cropName[lang] || pickupModalListing.cropName.te} (Grade ${pickupModalListing.grade})</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">పరిమాణం (Quantity):</span>
                <strong>${pickupModalListing.quantity} kg</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 6px;">
                <span style="color: var(--text-muted);">ధర (Offered Price):</span>
                <strong style="color: var(--primary-700);">₹${pickupModalListing.pricePerKg}/kg (మొత్తం: ₹${(pickupModalListing.quantity * pickupModalListing.pricePerKg).toLocaleString()})</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px;">
                <span style="color: var(--text-muted);">పికప్ లొకేషన్:</span>
                <span>📍 ${pickupModalListing.farmerVillage}</span>
              </div>
            </div>

            <!-- Schedule Date & Time Selection -->
            <div style="background: white; border-radius: var(--radius-md); padding: 12px; border: 1px solid var(--border-light); margin-bottom: 16px;">
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">పికప్ తేదీ (Date):</label>
                  <select class="search-input-field" style="padding: 8px; font-size: 13px;">
                    <option>రేపు ఉదయం (Tomorrow)</option>
                    <option>ఈరోజే సాయంత్రం (Today)</option>
                  </select>
                </div>
                <div>
                  <label style="font-size: 11px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">సమయం (Time):</label>
                  <select class="search-input-field" style="padding: 8px; font-size: 13px;">
                    <option>10:00 AM</option>
                    <option>12:00 PM</option>
                    <option>04:00 PM</option>
                  </select>
                </div>
              </div>
            </div>

            <button class="btn btn-primary btn-full btn-lg" id="confirmSendPickupBtn">
              🚀 పికప్ అభ్యర్థన పంపండి ➔
            </button>
          </div>
        </div>
      ` : ''}
    `;

    // Event Listeners
    container.querySelector('#speakSupplierBtn')?.addEventListener('click', () => {
      speakPrompt(`${t('supplier_dashboard_title')}. సమీపంలో ${activeListings.length} పంటలు అందుబాటులో ఉన్నాయి.`);
    });

    container.querySelector('#farmerSearchInput')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });

    container.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        selectedFilter = chip.dataset.filter;
        render();
      });
    });

    activeListings.forEach(listing => {
      container.querySelector(`#openPickupModalBtn-${listing.id}`)?.addEventListener('click', () => {
        pickupModalListing = listing;
        render();
        speakPrompt(`పికప్ అభ్యర్థన: ${listing.quantity} kg ${listing.cropName[lang] || listing.cropName.te}`);
      });

      container.querySelector(`#collectBtn-${listing.id}`)?.addEventListener('click', () => {
        store.setView('supplier_inventory');
      });
    });

    if (pickupModalListing) {
      container.querySelector('#closePickupModalBtn')?.addEventListener('click', () => {
        pickupModalListing = null;
        render();
      });

      container.querySelector('#confirmSendPickupBtn')?.addEventListener('click', () => {
        store.sendPickupRequest(pickupModalListing.id);
        const lName = pickupModalListing.cropName[lang] || pickupModalListing.cropName.te;
        pickupModalListing = null;
        render();
        speakPrompt(`${t('request_sent_success')}`);
      });
    }
  }

  render();
}
