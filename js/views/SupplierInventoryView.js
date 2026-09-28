/**
 * Panta2Plate - Supplier Inventory & Order Fulfillment View
 */

import { store } from '../store.js';
import { getLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderSupplierInventoryView(container) {
  const state = store.getState();
  const lang = getLang();

  const inventory = state.supplierInventory;
  const orders = state.orders;

  // Check if there is an uncollected accepted listing ready to be added to inventory
  const pendingCollection = state.listings.find(
    l => l.status === "requested" && l.supplierRequest?.status === "accepted"
  );

  let supplierPrice = 32;

  function render() {
    container.innerHTML = `
      <div class="fade-in-enter">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <div>
            <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">${t("supplier_inventory_title")}</h2>
            <p style="font-size: 13px; color: var(--text-muted);">రైతుల నుండి సేకరించిన తాజా స్టాక్ & ఆర్డర్లు</p>
          </div>
          <button class="speaker-btn" id="speakInvBtn" title="${t('listen_voice')}">🔊</button>
        </div>

        <!-- Harvest Collection & Pricing Card (If Pickup Accepted) -->
        ${pendingCollection ? `
          <div class="card card-highlight" style="margin-bottom: 20px; border-left: 5px solid var(--amber-500);">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <span style="font-size: 14px; font-weight: 800; color: var(--amber-700);">
                📦 ${t("supplier_collect_title")}
              </span>
              <span class="scenario-badge">${pendingCollection.farmerVillage}</span>
            </div>

            <div style="display: flex; gap: 12px; margin-bottom: 14px;">
              <img src="${pendingCollection.image}" alt="Collected Produce" class="listing-thumb-img" onerror="this.src='assets/tomatoes.jpg'" />
              <div>
                <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">
                  ${pendingCollection.quantity} kg ${pendingCollection.cropName[lang] || pendingCollection.cropName.te} (Grade ${pendingCollection.grade || 'A'})
                </h3>
                <p style="font-size: 12px; color: var(--text-muted); margin: 2px 0;">
                  రైతు నుండి కొనుగోలు: ₹${pendingCollection.pricePerKg}/కిలో
                </p>
                <div style="font-size: 12px; color: var(--primary-700); font-weight: 700;">
                  ${t("margin_recommendation")}
                </div>
              </div>
            </div>

            <!-- Set Selling Price Controls -->
            <div style="background: white; border-radius: var(--radius-md); padding: 14px; border: 1px solid var(--border-light); margin-bottom: 14px;">
              <label style="font-size: 13px; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 8px;">
                ${t("supplier_price_label")}
              </label>

              <div class="stepper-container" style="margin: 0;">
                <button class="stepper-btn" id="supPriceMinusBtn" style="width: 44px; height: 44px; min-height: 44px;">−</button>
                <div class="stepper-value-box" style="min-width: 110px; padding: 6px 12px;">
                  <div class="stepper-number" style="font-size: 24px;" id="supPriceVal">₹${supplierPrice}</div>
                  <div class="stepper-unit">${t("per_kg")}</div>
                </div>
                <button class="stepper-btn" id="supPricePlusBtn" style="width: 44px; height: 44px; min-height: 44px;">+</button>
              </div>
            </div>

            <button class="btn btn-primary btn-full btn-lg" id="confirmAddToInventoryBtn">
              ${t("add_to_inventory_btn")} ➔
            </button>
          </div>
        ` : ''}

        <!-- Active Inventory Stock -->
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary); margin-bottom: 12px;">
            🏬 రెస్టారెంట్లకు అందుబాటులో ఉన్న ఇన్వెంటరీ
          </h3>

          <div class="inventory-list">
            ${inventory.map(item => `
              <div class="card" style="margin-bottom: 12px; border: 1.5px solid var(--border-light);">
                <div style="display: flex; gap: 14px;">
                  <img src="${item.image}" alt="Produce" class="listing-thumb-img" onerror="this.src='assets/tomatoes.jpg'" />
                  <div style="flex: 1;">
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                      <h4 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${item.name[lang] || item.name.te}</h4>
                      <span class="distance-tag">స్టాక్: ${item.availableQuantity} kg</span>
                    </div>
                    <p style="font-size: 12px; color: var(--text-muted); margin: 3px 0;">మూలం: ${item.sourceFarmer}</p>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 6px;">
                      <div class="price-highlight">₹${item.sellingPrice} <span style="font-size: 12px; font-weight: 500; color: var(--text-muted);">/kg</span></div>
                      <span class="scenario-badge" style="background: var(--primary-700);">Grade ${item.grade || 'A'}</span>
                    </div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Incoming Restaurant Orders Queue -->
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">
              ${t("supplier_orders_title")}
            </h3>
            <span class="scenario-badge">${orders.length} ఆర్డర్లు</span>
          </div>

          ${orders.length === 0 ? `
            <div class="card" style="text-align: center; padding: 24px; color: var(--text-muted);">
              ${t("no_orders_yet")}
            </div>
          ` : `
            <div class="orders-list">
              ${orders.map(order => `
                <div class="card card-warm" style="margin-bottom: 14px; border: 1.5px solid var(--border-light);">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-size: 13px; font-weight: 800; color: var(--text-primary);">${order.restaurantName}</span>
                    <span class="scenario-badge" style="background: ${order.status === 'delivered' ? 'var(--status-success)' : order.status === 'out_for_delivery' ? 'var(--primary-600)' : order.status === 'preparing' ? 'var(--amber-600)' : 'var(--amber-500)'};">
                      ${order.status.toUpperCase()}
                    </span>
                  </div>

                  <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 10px;">
                    ${order.quantity} kg ${order.produceName[lang] || order.produceName.te} (Grade ${order.grade || 'A'}) • ₹${order.pricePerKg}/kg = <strong>₹${order.totalAmount.toLocaleString()}</strong>
                  </div>

                  <!-- Order Action Workflow Buttons -->
                  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${order.status === 'placed' ? `
                      <button class="btn btn-primary btn-full" id="acceptOrderBtn-${order.id}">
                        ${t("accept_order_btn")}
                      </button>
                    ` : order.status === 'accepted' ? `
                      <button class="btn btn-accent btn-full" id="prepOrderBtn-${order.id}">
                        ${t("prepare_order_btn")}
                      </button>
                    ` : order.status === 'preparing' ? `
                      <button class="btn btn-primary btn-full" id="dispatchOrderBtn-${order.id}">
                        ${t("dispatch_order_btn")}
                      </button>
                    ` : order.status === 'out_for_delivery' ? `
                      <button class="btn btn-primary btn-full" id="deliverOrderBtn-${order.id}">
                        ${t("mark_delivered_btn")}
                      </button>
                    ` : `
                      <div style="width: 100%; text-align: center; font-size: 13px; font-weight: 700; color: var(--status-success); padding: 8px;">
                        🏁 విజయవంతంగా డెలివరీ పూర్తయింది
                      </div>
                    `}
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    // Event Listeners
    container.querySelector('#speakInvBtn')?.addEventListener('click', () => {
      speakPrompt(`${t('supplier_inventory_title')}. ఇన్వెంటరీలో తాజా పంట అందుబాటులో ఉంది.`);
    });

    if (pendingCollection) {
      container.querySelector('#supPriceMinusBtn')?.addEventListener('click', () => {
        if (supplierPrice > pendingCollection.pricePerKg) {
          supplierPrice -= 1;
          container.querySelector('#supPriceVal').innerText = `₹${supplierPrice}`;
        }
      });

      container.querySelector('#supPricePlusBtn')?.addEventListener('click', () => {
        supplierPrice += 1;
        container.querySelector('#supPriceVal').innerText = `₹${supplierPrice}`;
      });

      container.querySelector('#confirmAddToInventoryBtn')?.addEventListener('click', () => {
        store.collectAndAddToInventory(pendingCollection.id, supplierPrice);
        render();
        speakPrompt(t("inventory_updated_success"));
      });
    }

    orders.forEach(order => {
      container.querySelector(`#acceptOrderBtn-${order.id}`)?.addEventListener('click', () => {
        store.updateOrderStatus(order.id, 'accepted');
        render();
      });

      container.querySelector(`#prepOrderBtn-${order.id}`)?.addEventListener('click', () => {
        store.updateOrderStatus(order.id, 'preparing');
        render();
      });

      container.querySelector(`#dispatchOrderBtn-${order.id}`)?.addEventListener('click', () => {
        store.updateOrderStatus(order.id, 'out_for_delivery');
        render();
        speakPrompt(t("step_dispatched"));
      });

      container.querySelector(`#deliverOrderBtn-${order.id}`)?.addEventListener('click', () => {
        store.updateOrderStatus(order.id, 'delivered');
        render();
        speakPrompt(t("step_delivered"));
      });
    });
  }

  render();
}
