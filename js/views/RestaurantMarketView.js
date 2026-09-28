/**
 * Panta2Plate - Restaurant Marketplace & Ordering View
 */

import { store, calculateDistanceKm } from '../store.js';
import { getLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderRestaurantMarketView(container) {
  const state = store.getState();
  const lang = getLang();
  const rest = state.restaurantInfo;
  const userLoc = state.userLocation;

  let searchQuery = "";
  let selectedGradeFilter = "all";
  let selectedItem = null;
  let orderQuantity = 50;
  let showDemandModal = false;

  function render() {
    // Restaurant coordinates
    const rLat = userLoc.permissionGranted ? userLoc.lat : (rest.location?.lat || 17.4483);
    const rLng = userLoc.permissionGranted ? userLoc.lng : (rest.location?.lng || 78.3915);

    let inventoryItems = state.supplierInventory.filter(item => {
      if (selectedGradeFilter !== "all" && item.grade !== selectedGradeFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const pName = (item.name[lang] || item.name.te || "").toLowerCase();
        const source = (item.sourceFarmer || "").toLowerCase();
        return pName.includes(q) || source.includes(q);
      }
      return true;
    });

    if (inventoryItems.length === 0 && !searchQuery.trim() && selectedGradeFilter === 'all') {
      inventoryItems = [
        {
          id: "INV-201",
          produceKey: "tomato",
          name: { te: "నాటు టమాటాలు (Fresh Tomatoes)", hi: "देशी टमाटर", en: "Farm Fresh Tomatoes" },
          sourceFarmer: "రామయ్య (చేవెళ్ళ ఫార్మ్)",
          grade: "A",
          procuredPrice: 30,
          sellingPrice: 32,
          availableQuantity: 100,
          unit: "kg",
          image: "assets/tomatoes.jpg",
          freshness: "Grade A Farm Fresh (Just Harvested)",
          location: { lat: 17.3616, lng: 78.4747, name: "హైదరాబాద్ హబ్" }
        }
      ];
    }

    container.innerHTML = `
      <div class="fade-in-enter">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
          <div>
            <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">${t("restaurant_dashboard_title")}</h2>
            <p style="font-size: 13px; color: var(--text-muted);">రైతు పొలాల నుండి నేరుగా తాజా కూరగాయలు</p>
          </div>
          <button class="speaker-btn" id="speakMarketBtn" title="${t('listen_voice')}">🔊</button>
        </div>

        <!-- Search Bar -->
        <div class="search-filter-bar">
          <div class="search-input-wrap">
            <span class="search-icon-pos">🔍</span>
            <input type="text" id="marketSearchInput" class="search-input-field" value="${searchQuery}" placeholder="${t('search_produce_placeholder')}" />
          </div>
        </div>

        <!-- Grade Filter Chips -->
        <div class="quick-chips-row" style="margin-bottom: 14px;">
          <button class="quick-chip ${selectedGradeFilter === 'all' ? 'active' : ''}" data-grade="all">${t("filter_all")}</button>
          <button class="quick-chip ${selectedGradeFilter === 'A' ? 'active' : ''}" data-grade="A">🌟 Grade A</button>
          <button class="quick-chip ${selectedGradeFilter === 'B' ? 'active' : ''}" data-grade="B">🌿 Grade B</button>
        </div>

        <!-- Verified Suppliers Section -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin: 12px 0;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${t("available_suppliers_title")}</h3>
          <span class="scenario-badge">సూపర్ డీల్స్</span>
        </div>

        <!-- Produce Comparison Cards -->
        <div class="comparison-feed">
          ${inventoryItems.length === 0 ? `
            <div class="card" style="text-align: center; padding: 24px; color: var(--text-muted);">
              లభ్యం కాలేదు. క్రింది బటన్ నొక్కి ప్రత్యేక డిమాండ్ రిక్వెస్ట్ పెట్టండి.
            </div>
          ` : inventoryItems.map(item => {
            const iLat = item.location?.lat || 17.3616;
            const iLng = item.location?.lng || 78.4747;
            const distKm = calculateDistanceKm(rLat, rLng, iLat, iLng);

            return `
              <div class="comparison-card">
                <div class="comparison-top-row">
                  <img src="${item.image}" alt="Produce" class="comparison-img" onerror="this.src='assets/tomatoes.jpg'" />
                  <div class="comparison-details">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <div class="comparison-produce-name">${item.name[lang] || item.name.te}</div>
                      <span class="scenario-badge" style="background: var(--primary-700);">Grade ${item.grade || 'A'}</span>
                    </div>
                    <div class="comparison-supplier-name">🚚 ${t("supplier_name")}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">
                      ⭐ ${t("supplier_rating")}
                    </div>
                    <div style="font-size: 11px; color: var(--primary-700); font-weight: 700; margin-top: 4px;">
                      🌱 ${item.sourceFarmer}
                    </div>
                  </div>
                </div>

                <!-- Metric Comparison Grid -->
                <div class="comparison-metrics-row">
                  <div>
                    <div class="metric-label">హోల్‌సేల్ ధర</div>
                    <div class="metric-value" style="color: var(--primary-700);">₹${item.sellingPrice}/kg</div>
                  </div>
                  <div>
                    <div class="metric-label">లభ్యత</div>
                    <div class="metric-value">${item.availableQuantity} kg</div>
                  </div>
                  <div>
                    <div class="metric-label">దూరం</div>
                    <div class="metric-value">${distKm} km</div>
                  </div>
                </div>

                <button class="btn btn-primary btn-full" id="openOrderModalBtn-${item.id}" style="margin-top: 14px;">
                  ${t("order_now_btn")} ➔
                </button>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Custom Demand Banner -->
        <div class="card card-warm" style="margin-top: 20px; border: 1.5px dashed var(--amber-400);">
          <h4 style="font-size: 15px; font-weight: 800; color: var(--amber-700); margin-bottom: 4px;">
            💡 ${t("demand_banner_title")}
          </h4>
          <p style="font-size: 12px; color: var(--text-secondary); margin-bottom: 12px;">
            ${t("demand_banner_desc")}
          </p>
          <button class="btn btn-secondary btn-full" id="postDemandBtn">
            ${t("post_demand_btn")}
          </button>
        </div>
      </div>

      <!-- Order Quantity Modal (Bottom Sheet) -->
      ${selectedItem ? `
        <div class="modal-overlay" id="orderModalOverlay">
          <div class="bottom-sheet">
            <div class="sheet-handle"></div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">${t("order_modal_title")}</h3>
              <button class="speech-bubble-close" id="closeOrderModalBtn" style="color: var(--text-muted); font-size: 20px;">✕</button>
            </div>

            <div style="display: flex; gap: 12px; margin-bottom: 16px;">
              <img src="${selectedItem.image}" alt="Produce" class="listing-thumb-img" onerror="this.src='assets/tomatoes.jpg'" />
              <div>
                <h4 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${selectedItem.name[lang] || selectedItem.name.te} (Grade ${selectedItem.grade || 'A'})</h4>
                <div class="price-highlight">₹${selectedItem.sellingPrice} /kg</div>
                <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">స్టాక్ అందుబాటులో: ${selectedItem.availableQuantity} kg</div>
              </div>
            </div>

            <!-- Tactile Quantity Selector -->
            <div class="card card-warm" style="text-align: center; padding: 18px 14px; margin-bottom: 16px;">
              <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">${t("select_order_qty")}</span>

              <div class="stepper-container" style="margin: 12px 0;">
                <button class="stepper-btn" id="orderMinusBtn">−</button>
                <div class="stepper-value-box">
                  <div class="stepper-number" id="orderQtyDisplay">${orderQuantity}</div>
                  <div class="stepper-unit">${t("kg")}</div>
                </div>
                <button class="stepper-btn" id="orderPlusBtn">+</button>
              </div>

              <!-- Quick Order Chips -->
              <div class="quick-chips-row">
                <button class="quick-chip" data-set="25">25 kg</button>
                <button class="quick-chip ${orderQuantity === 50 ? 'active' : ''}" data-set="50">50 kg</button>
                <button class="quick-chip" data-set="75">75 kg</button>
                <button class="quick-chip" data-set="100">100 kg</button>
              </div>
            </div>

            <!-- Bill Breakdown -->
            <div class="card" style="background: white; border: 1px solid var(--border-light); margin-bottom: 20px;">
              <h4 style="font-size: 13px; font-weight: 700; color: var(--text-muted); margin-bottom: 8px;">${t("bill_breakdown")}</h4>
              <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 6px;">
                <span>${orderQuantity} kg × ₹${selectedItem.sellingPrice}</span>
                <strong>₹${(orderQuantity * selectedItem.sellingPrice).toLocaleString()}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 13px; color: var(--status-success); margin-bottom: 8px;">
                <span>${t("delivery_fee")}</span>
                <span>₹0 (ఉచితం)</span>
              </div>
              <div style="border-top: 1.5px dashed var(--border-light); padding-top: 8px; display: flex; justify-content: space-between; font-size: 17px; font-weight: 800; color: var(--primary-800);">
                <span>మొత్తం బిల్లు:</span>
                <span id="finalBillTotal">₹${(orderQuantity * selectedItem.sellingPrice).toLocaleString()}</span>
              </div>
            </div>

            <button class="btn btn-primary btn-full btn-lg" id="confirmPlaceOrderBtn">
              ${t("place_order_btn")} ➔
            </button>
          </div>
        </div>
      ` : ''}

      <!-- Custom Demand Modal -->
      ${showDemandModal ? `
        <div class="modal-overlay" id="demandModalOverlay">
          <div class="bottom-sheet">
            <div class="sheet-handle"></div>

            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
              <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">📝 ప్రత్యేక డిమాండ్ అభ్యర్థన</h3>
              <button class="speech-bubble-close" id="closeDemandModalBtn" style="color: var(--text-muted); font-size: 20px;">✕</button>
            </div>

            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">కావలసిన పంట:</label>
              <input type="text" id="demandProductInput" class="search-input-field" value="ఆర్గానిక్ నాటు టమాటాలు" />
            </div>

            <div style="margin-bottom: 12px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">పరిమాణం (kg):</label>
              <input type="number" id="demandQtyInput" class="search-input-field" value="150" />
            </div>

            <div style="margin-bottom: 16px;">
              <label style="font-size: 12px; font-weight: 700; color: var(--text-muted); display: block; margin-bottom: 4px;">కావలసిన సమయం:</label>
              <input type="text" id="demandDateInput" class="search-input-field" value="రేపు సాయంత్రం 05:00 PM" />
            </div>

            <button class="btn btn-primary btn-full btn-lg" id="submitDemandBtn">
              🚀 డిమాండ్ పంపండి ➔
            </button>
          </div>
        </div>
      ` : ''}
    `;

    // Event Listeners
    container.querySelector('#speakMarketBtn')?.addEventListener('click', () => {
      speakPrompt(`${t('restaurant_dashboard_title')}. తాజా కూరగాయలు హోల్‌సేల్ ధరలకు అందుబాటులో ఉన్నాయి.`);
    });

    container.querySelector('#marketSearchInput')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });

    container.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        selectedGradeFilter = chip.dataset.grade;
        render();
      });
    });

    container.querySelector('#postDemandBtn')?.addEventListener('click', () => {
      showDemandModal = true;
      render();
    });

    inventoryItems.forEach(item => {
      container.querySelector(`#openOrderModalBtn-${item.id}`)?.addEventListener('click', () => {
        selectedItem = item;
        orderQuantity = 50;
        render();
        speakPrompt(`${t('order_modal_title')}. 50 ${t('kg')}`);
      });
    });

    if (selectedItem) {
      container.querySelector('#closeOrderModalBtn')?.addEventListener('click', () => {
        selectedItem = null;
        render();
      });

      const updateBill = () => {
        const total = orderQuantity * selectedItem.sellingPrice;
        container.querySelector('#orderQtyDisplay').innerText = orderQuantity;
        container.querySelector('#finalBillTotal').innerText = `₹${total.toLocaleString()}`;
      };

      container.querySelector('#orderMinusBtn')?.addEventListener('click', () => {
        if (orderQuantity > 10) {
          orderQuantity -= 5;
          updateBill();
        }
      });

      container.querySelector('#orderPlusBtn')?.addEventListener('click', () => {
        if (orderQuantity < selectedItem.availableQuantity) {
          orderQuantity += 5;
          updateBill();
        }
      });

      container.querySelectorAll('.quick-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          if (chip.dataset.set) {
            orderQuantity = Number(chip.dataset.set);
            updateBill();
          }
        });
      });

      container.querySelector('#confirmPlaceOrderBtn')?.addEventListener('click', () => {
        store.placeOrder(selectedItem.produceKey, orderQuantity);
        selectedItem = null;
        store.setView('restaurant_tracking');
        speakPrompt(`${t('order_success_title')}. ${t('tracking_title')}`);
      });
    }

    if (showDemandModal) {
      container.querySelector('#closeDemandModalBtn')?.addEventListener('click', () => {
        showDemandModal = false;
        render();
      });

      container.querySelector('#submitDemandBtn')?.addEventListener('click', () => {
        const prod = container.querySelector('#demandProductInput')?.value;
        const qty = container.querySelector('#demandQtyInput')?.value;
        const date = container.querySelector('#demandDateInput')?.value;
        store.createProductRequest({ product: prod, quantity: qty, requiredDate: date });
        showDemandModal = false;
        render();
        speakPrompt("మీ ప్రత్యేక డిమాండ్ అభ్యర్థన విజయవంతంగా పోస్ట్ చేయబడింది.");
      });
    }
  }

  render();
}
