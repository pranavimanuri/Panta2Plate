/**
 * Panta2Plate - Restaurant Order Live Tracking View
 */

import { store } from '../store.js';
import { getLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderRestaurantOrderTrackingView(container) {
  const state = store.getState();
  const lang = getLang();

  // Find latest order or default fallback
  let order = state.orders[0] || {
    id: "ORD-701",
    restaurantName: "గ్రీన్ లీఫ్ బిస్ట్రో (Green Leaf Bistro)",
    supplierName: "శ్రీ బాలాజీ ఆగ్రో లాజిస్టిక్స్",
    produceName: { te: "నాటు టమాటాలు", hi: "देशी टमाटर", en: "Farm Fresh Tomatoes" },
    grade: "A",
    quantity: 50,
    pricePerKg: 32,
    totalAmount: 1600,
    status: "out_for_delivery",
    image: "assets/tomatoes.jpg",
    timeline: [
      { status: "placed", title: "ఆర్డర్ నమోదైంది (Order Placed)", time: "10:30 AM", completed: true },
      { status: "accepted", title: "సరఫరాదారు అంగీకరించారు (Accepted)", time: "10:32 AM", completed: true },
      { status: "preparing", title: "ప్యాకింగ్ పూర్తయింది (Packed)", time: "10:45 AM", completed: true },
      { status: "out_for_delivery", title: "డెలివరీ బయలుదేరింది (Out for Delivery)", time: "11:00 AM", completed: true },
      { status: "delivered", title: "డెలివరీ పూర్తయింది (Delivered)", time: "పెండింగ్", completed: false }
    ]
  };

  container.innerHTML = `
    <div class="fade-in-enter">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
        <div>
          <h2 style="font-size: 20px; font-weight: 800; color: var(--text-primary);">${t("tracking_title")}</h2>
          <p style="font-size: 12px; color: var(--text-muted);">${t("order_id_label")} ${order.id}</p>
        </div>
        <button class="speaker-btn" id="speakTrackingBtn" title="${t('listen_voice')}">🔊</button>
      </div>

      <!-- Order Summary Card -->
      <div class="card card-warm" style="margin-bottom: 16px; border: 1.5px solid var(--border-light);">
        <div style="display: flex; gap: 14px; align-items: center;">
          <img src="${order.image}" alt="Produce" class="listing-thumb-img" style="width: 70px; height: 70px;" onerror="this.src='assets/tomatoes.jpg'" />
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h3 style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${order.produceName[lang] || order.produceName.te}</h3>
              <span class="scenario-badge" style="background: var(--primary-600);">${order.status.toUpperCase()}</span>
            </div>
            <div style="font-size: 13px; color: var(--text-secondary); margin-top: 3px;">
              ${order.quantity} kg (Grade ${order.grade || 'A'}) • బిల్లు: <strong>₹${order.totalAmount.toLocaleString()}</strong>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 2px;">
              🚚 ${order.supplierName}
            </div>
          </div>
        </div>
      </div>

      <!-- Live Delivery Route Simulation Card -->
      <div class="supplier-map-card" style="margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <div style="font-size: 14px; font-weight: 800; color: #a7f3d0;">
            📍 ${t("estimated_arrival")}
          </div>
          <span class="scenario-badge" style="background: #059669;">LIVE GPS</span>
        </div>

        <div style="background: rgba(255, 255, 255, 0.1); border-radius: var(--radius-md); padding: 14px; display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 32px; animation: bounce 1s infinite alternate;">🚚</div>
          <div>
            <div style="font-size: 13px; font-weight: 700; color: white;">డ్రైవర్: రమేష్ (TS 09 EC 2026)</div>
            <div style="font-size: 11px; color: #d1fae5; margin-top: 2px;">చేవెళ్ళ నుండి హైటెక్ సిటీ వైపు వస్తున్నారు</div>
          </div>
        </div>

        <button class="btn btn-secondary btn-full" id="callDriverBtn" style="margin-top: 12px; background: white; color: var(--text-primary); font-size: 13px; min-height: 42px;">
          📞 ${t("call_driver")}
        </button>
      </div>

      <!-- Status Timeline Stepper -->
      <div class="card" style="border: 1px solid var(--border-light);">
        <h3 style="font-size: 15px; font-weight: 800; color: var(--text-primary); margin-bottom: 14px;">
          📋 ఆర్డర్ పురోగతి (Live Progress)
        </h3>

        <div class="tracker-timeline">
          ${order.timeline.map((step, idx) => `
            <div class="timeline-step-item ${step.completed ? 'completed' : ''}">
              <div class="timeline-node">
                ${step.completed ? '✓' : idx + 1}
              </div>
              <div class="timeline-step-title">${step.title}</div>
              <div class="timeline-step-time">${step.time}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Advance Status Trigger Button -->
      ${order.status !== 'delivered' ? `
        <button class="btn btn-primary btn-full btn-lg" id="advanceDeliveryStatusBtn" style="margin-top: 16px;">
          ⚡ డెలివరీ పూర్తి చేయండి (Simulate Delivered) 🏁
        </button>
      ` : `
        <div class="card" style="margin-top: 16px; background: #ecfdf5; border: 1.5px solid #a7f3d0; text-align: center; color: #065f46; font-weight: 800; padding: 16px;">
          🎉 కూరగాయలు విజయవంతంగా రెస్టారెంట్ కిచెన్‌కు అందజేయబడ్డాయి!
        </div>
      `}
    </div>
  `;

  // Event Listeners
  container.querySelector('#speakTrackingBtn')?.addEventListener('click', () => {
    speakPrompt(`${t('tracking_title')}. ఆర్డర్ డెలివరీ పురోగతిలో ఉంది. అంచనా సమయం 25 నిమిషాలు.`);
  });

  container.querySelector('#callDriverBtn')?.addEventListener('click', () => {
    speakPrompt("డ్రైవర్ రమేష్‌కు కాలింగ్... TS 09 EC 2026");
    store.addNotification("కాలింగ్...", "డ్రైవర్ రమేష్ తో కనెక్ట్ అవుతోంది (+91 9988776655)");
  });

  container.querySelector('#advanceDeliveryStatusBtn')?.addEventListener('click', () => {
    store.updateOrderStatus(order.id, 'delivered');
    speakPrompt(t("step_delivered"));
  });
}
