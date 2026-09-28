/**
 * Panta2Plate - Farmer Crop Listing Wizard
 * Human-centered, step-by-step listing wizard with AI detection, visible grade review & tactile controls
 */

import { store } from '../store.js';
import { getLang, t } from '../i18n.js';
import { speakPrompt } from '../speech.js';

export function renderFarmerListingWizardView(container) {
  const lang = getLang();

  // Wizard state
  let currentStep = 1; // 1: Photo/AI, 2: Crop Confirm, 3: Quantity, 4: Price, 5: Review, 6: Success
  let isAnalyzing = false;
  let analysisError = null;

  let listingData = {
    cropKey: "tomato",
    cropName: {
      te: "నాటు టమాటాలు (Fresh Tomatoes)",
      hi: "देशी टमाटर (Fresh Tomatoes)",
      en: "Farm Fresh Tomatoes"
    },
    variety: "Desi Hybrid",
    grade: "A",
    gradeConfidence: 0.94,
    observations: [
      "మంచి ఎరుపు రంగు మరియు సహజ నిగారింపు (Bright red color)",
      "పైభాగంలో ఎలాంటి నల్లటి మచ్చలు లేదా గాయాలు లేవు (No surface bruising)"
    ],
    quantity: 100, // kg
    pricePerKg: 30, // ₹
    image: "assets/tomatoes.jpg",
    photoTaken: true,
    isIdentifiable: true
  };

  async function handleImageFile(file) {
    if (!file) return;
    isAnalyzing = true;
    analysisError = null;
    render();
    speakPrompt(t("ai_detecting"));

    try {
      const result = await store.analyzeCropImage(file);
      isAnalyzing = false;

      if (result && result.data) {
        const data = result.data;
        listingData.image = result.imageUrl || URL.createObjectURL(file);
        listingData.cropKey = data.productKey || "tomato";
        listingData.cropName = {
          te: data.productTelugu || data.product,
          hi: data.productHindi || data.product,
          en: data.product || "Vegetables"
        };
        listingData.grade = data.grade || "A";
        listingData.gradeConfidence = data.confidence || 0.92;
        listingData.observations = data.observations || ["మంచి నాణ్యమైన పంట (Fresh harvest)"];
        listingData.isIdentifiable = data.isIdentifiable !== false;
        listingData.photoTaken = true;

        if (!listingData.isIdentifiable) {
          analysisError = "Could not confidently identify the crop. Please try another photo.";
        }
      }
    } catch (err) {
      console.warn("AI Crop Analysis Error:", err);
      isAnalyzing = false;
      analysisError = "AI detection could not complete. You can select the crop manually.";
    }

    render();
    if (listingData.isIdentifiable) {
      const confidencePct = Math.round((listingData.gradeConfidence || 0.9) * 100);
      speakPrompt(`${t('ai_detected_success')}. ${listingData.cropName[lang] || listingData.cropName.te}. Grade ${listingData.grade}.`);
    } else {
      speakPrompt("పంటను ఖచ్చితంగా గుర్తించలేకపోయాము. దయచేసి స్పష్టమైన ఫోటో తీయండి.");
    }
  }

  function render() {
    // -------------------------------------------------------------
    // Step 1: Crop Photo & AI Detection
    // -------------------------------------------------------------
    if (currentStep === 1) {
      const confidencePct = Math.round((listingData.gradeConfidence || 0.92) * 100);

      container.innerHTML = `
        <div class="fade-in-enter">
          <div class="wizard-header">
            <div class="wizard-step-indicator">
              <span class="step-pill-indicator">1 / 5</span>
              <button class="speaker-btn" id="speakStepBtn" title="${t('listen_voice')}">🔊</button>
            </div>
            <h2 class="wizard-title">${t("step1_title")}</h2>
            <p class="wizard-subtitle">${t("step1_sub")}</p>
          </div>

          <!-- Hidden File & Camera Inputs -->
          <input type="file" id="cameraFileInput" accept="image/*" capture="environment" style="display: none;" />
          <input type="file" id="galleryFileInput" accept="image/*" style="display: none;" />

          <!-- Photo & AI Analysis Box -->
          <div class="photo-capture-box" id="triggerPhotoBox" style="position: relative; overflow: hidden; min-height: 220px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000;">
            ${isAnalyzing ? `
              <div style="text-align: center; color: white; padding: 30px 10px;">
                <div style="font-size: 40px; animation: spin 1.5s linear infinite; display: inline-block;">⚙️</div>
                <h3 style="font-size: 16px; font-weight: 800; margin-top: 12px;">${t("ai_detecting")}</h3>
                <p style="font-size: 12px; color: #a7f3d0; margin-top: 4px;">రైతు పంట నాణ్యత మరియు రంగును పరిశీలిస్తోంది...</p>
              </div>
            ` : `
              <img src="${listingData.image}" alt="Captured Crop" class="photo-preview-large" style="width: 100%; height: 220px; object-fit: cover;" onerror="this.src='assets/tomatoes.jpg'" />
              
              <div class="ai-detected-tag" style="background: rgba(18, 127, 68, 0.92); backdrop-filter: blur(8px); display: flex; align-items: center; gap: 6px;">
                <span>✨</span>
                <span>${t("ai_detected_success")}</span>
              </div>
            `}
          </div>

          <!-- AI Analysis Breakdown Card (If Analyzed) -->
          ${!isAnalyzing && listingData.photoTaken ? `
            <div class="card card-warm" style="margin-top: 14px; border: 1.5px solid var(--primary-200); padding: 14px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <div>
                  <span style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">AI గుర్తింపు (AI Vision)</span>
                  <h3 style="font-size: 17px; font-weight: 800; color: var(--primary-900);">
                    ${listingData.cropName[lang] || listingData.cropName.te}
                  </h3>
                </div>
                <div style="text-align: right;">
                  <span class="scenario-badge" style="background: var(--primary-700); font-size: 13px;">
                    Grade ${listingData.grade} (${confidencePct}%)
                  </span>
                </div>
              </div>

              <!-- Visible Characteristics List -->
              <div style="background: white; border-radius: var(--radius-sm); padding: 10px 12px; margin-top: 8px; border: 1px solid var(--border-light);">
                <span style="font-size: 11px; font-weight: 700; color: var(--text-secondary); display: block; margin-bottom: 4px;">
                  📋 కనిపించే భౌతిక లక్షణాలు (Visible Characteristics):
                </span>
                <ul style="margin: 0; padding-left: 18px; font-size: 12px; color: var(--text-primary); line-height: 1.5;">
                  ${listingData.observations.map(obs => `<li>${obs}</li>`).join('')}
                </ul>
              </div>

              <!-- Transparent Quality Disclaimer -->
              <p style="font-size: 11px; color: var(--text-muted); margin-top: 8px; font-style: italic; line-height: 1.3;">
                ⚠️ గమనిక: AI కేవలం ఫోటోలో కనిపించే బాహ్య లక్షణాలను మాత్రమే గుర్తిస్తుంది. అంతర్గత నాణ్యతను ఫోటో ద్వారా నిర్ణయించలేము.
              </p>
            </div>
          ` : ''}

          <!-- Camera & Gallery Action Buttons -->
          <div style="display: flex; gap: 10px; margin: 16px 0;">
            <button class="btn btn-secondary" id="triggerCamBtn" style="flex: 1;">
              ${t("take_photo_btn")}
            </button>
            <button class="btn btn-secondary" id="triggerGalleryBtn" style="flex: 1;">
              ${t("upload_photo_btn")}
            </button>
          </div>

          <button class="btn btn-primary btn-full btn-lg" id="nextFromStep1Btn">
            ${t("next_btn")} ➔
          </button>
        </div>
      `;

      // Event Listeners
      container.querySelector('#speakStepBtn')?.addEventListener('click', () => {
        speakPrompt(`${t('step1_title')}. ${t('step1_sub')}`);
      });

      const camInput = container.querySelector('#cameraFileInput');
      const galInput = container.querySelector('#galleryFileInput');

      container.querySelector('#triggerCamBtn')?.addEventListener('click', () => {
        camInput?.click();
      });

      container.querySelector('#triggerGalleryBtn')?.addEventListener('click', () => {
        galInput?.click();
      });

      camInput?.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleImageFile(e.target.files[0]);
        }
      });

      galInput?.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleImageFile(e.target.files[0]);
        }
      });

      container.querySelector('#nextFromStep1Btn')?.addEventListener('click', () => {
        currentStep = 2;
        render();
        speakPrompt(`${t('step2_title')}. ${t('step2_sub')}`);
      });
    }

    // -------------------------------------------------------------
    // Step 2: Select Produce Type & Variety
    // -------------------------------------------------------------
    else if (currentStep === 2) {
      const crops = [
        { key: "tomato", name: t("crop_tomato"), img: "assets/tomatoes.jpg", variety: "Desi Hybrid (Grade A)" },
        { key: "chilli", name: t("crop_chilli"), img: "assets/chillies.jpg", variety: "Guntur Teja (Spicy)" },
        { key: "onion", name: t("crop_onion"), img: "assets/onions.jpg", variety: "Nasik Medium (Grade A)" },
        { key: "potato", name: t("crop_potato"), img: "assets/onions.jpg", variety: "Jyoti Large (Fresh)" }
      ];

      container.innerHTML = `
        <div class="fade-in-enter">
          <div class="wizard-header">
            <div class="wizard-step-indicator">
              <span class="step-pill-indicator">2 / 5</span>
              <button class="speaker-btn" id="speakStepBtn" title="${t('listen_voice')}">🔊</button>
            </div>
            <h2 class="wizard-title">${t("step2_title")}</h2>
            <p class="wizard-subtitle">${t("step2_sub")}</p>
          </div>

          <div class="produce-grid">
            ${crops.map(c => `
              <div class="produce-card-select ${listingData.cropKey === c.key ? 'selected' : ''}" data-crop="${c.key}">
                <img src="${c.img}" alt="${c.name}" class="produce-card-img" />
                <span class="produce-card-name">${c.name}</span>
                <span style="font-size: 11px; color: var(--text-muted);">${c.variety}</span>
              </div>
            `).join('')}
          </div>

          <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-secondary" id="backStepBtn" style="flex: 1;">
              ${t("back_btn")}
            </button>
            <button class="btn btn-primary" id="nextFromStep2Btn" style="flex: 2;">
              ${t("next_btn")} ➔
            </button>
          </div>
        </div>
      `;

      container.querySelector('#speakStepBtn')?.addEventListener('click', () => {
        speakPrompt(`${t('step2_title')}. ${t('step2_sub')}`);
      });

      container.querySelectorAll('.produce-card-select').forEach(card => {
        card.addEventListener('click', () => {
          const crop = card.dataset.crop;
          listingData.cropKey = crop;
          if (crop === 'tomato') {
            listingData.image = 'assets/tomatoes.jpg';
            listingData.cropName = { te: "నాటు టమాటాలు", hi: "देशी टमाटर", en: "Farm Fresh Tomatoes" };
            listingData.variety = "Desi Hybrid";
          } else if (crop === 'chilli') {
            listingData.image = 'assets/chillies.jpg';
            listingData.cropName = { te: "పచ్చిమిర్చి", hi: "हरी मिर्च", en: "Green Chillies" };
            listingData.variety = "Guntur Teja";
          } else if (crop === 'onion') {
            listingData.image = 'assets/onions.jpg';
            listingData.cropName = { te: "ఎర్ర ఉల్లిపాయలు", hi: "लाल प्याज", en: "Red Onions" };
            listingData.variety = "Nasik Medium";
          }
          render();
        });
      });

      container.querySelector('#backStepBtn')?.addEventListener('click', () => {
        currentStep = 1;
        render();
      });

      container.querySelector('#nextFromStep2Btn')?.addEventListener('click', () => {
        currentStep = 3;
        render();
        speakPrompt(`${t('step3_title')}. ${t('step3_sub')}`);
      });
    }

    // -------------------------------------------------------------
    // Step 3: Enter Quantity (Tactile Stepper)
    // -------------------------------------------------------------
    else if (currentStep === 3) {
      container.innerHTML = `
        <div class="fade-in-enter">
          <div class="wizard-header">
            <div class="wizard-step-indicator">
              <span class="step-pill-indicator">3 / 5</span>
              <button class="speaker-btn" id="speakStepBtn" title="${t('listen_voice')}">🔊</button>
            </div>
            <h2 class="wizard-title">${t("step3_title")}</h2>
            <p class="wizard-subtitle">${t("step3_sub")}</p>
          </div>

          <div class="card card-warm" style="text-align: center; padding: 24px 16px;">
            <span style="font-size: 14px; font-weight: 700; color: var(--text-muted);">${t("quantity_label")}</span>

            <!-- Tactile Stepper Controls -->
            <div class="stepper-container">
              <button class="stepper-btn" id="qtyMinusBtn">−</button>
              <div class="stepper-value-box">
                <div class="stepper-number" id="qtyNumberDisplay">${listingData.quantity}</div>
                <div class="stepper-unit">${t("kg")}</div>
              </div>
              <button class="stepper-btn" id="qtyPlusBtn">+</button>
            </div>

            <!-- Quick Add Chips -->
            <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); margin-top: 14px; margin-bottom: 8px;">
              ${t("quick_add")}
            </div>
            <div class="quick-chips-row">
              <button class="quick-chip" data-set="50">50 kg</button>
              <button class="quick-chip ${listingData.quantity === 100 ? 'active' : ''}" data-set="100">100 kg</button>
              <button class="quick-chip" data-set="200">200 kg</button>
              <button class="quick-chip" data-add="50">+50 kg</button>
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-secondary" id="backStepBtn" style="flex: 1;">
              ${t("back_btn")}
            </button>
            <button class="btn btn-primary" id="nextFromStep3Btn" style="flex: 2;">
              ${t("next_btn")} ➔
            </button>
          </div>
        </div>
      `;

      container.querySelector('#speakStepBtn')?.addEventListener('click', () => {
        speakPrompt(`${t('step3_title')}. ${listingData.quantity} ${t('kg')}`);
      });

      container.querySelector('#qtyMinusBtn')?.addEventListener('click', () => {
        if (listingData.quantity > 10) {
          listingData.quantity -= 10;
          container.querySelector('#qtyNumberDisplay').innerText = listingData.quantity;
        }
      });

      container.querySelector('#qtyPlusBtn')?.addEventListener('click', () => {
        listingData.quantity += 10;
        container.querySelector('#qtyNumberDisplay').innerText = listingData.quantity;
      });

      container.querySelectorAll('.quick-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          if (chip.dataset.set) {
            listingData.quantity = Number(chip.dataset.set);
          } else if (chip.dataset.add) {
            listingData.quantity += Number(chip.dataset.add);
          }
          container.querySelector('#qtyNumberDisplay').innerText = listingData.quantity;
        });
      });

      container.querySelector('#backStepBtn')?.addEventListener('click', () => {
        currentStep = 2;
        render();
      });

      container.querySelector('#nextFromStep3Btn')?.addEventListener('click', () => {
        currentStep = 4;
        render();
        speakPrompt(`${t('step4_title')}. ${t('step4_sub')}`);
      });
    }

    // -------------------------------------------------------------
    // Step 4: Expected Price per kg
    // -------------------------------------------------------------
    else if (currentStep === 4) {
      const estimatedTotal = listingData.quantity * listingData.pricePerKg;

      container.innerHTML = `
        <div class="fade-in-enter">
          <div class="wizard-header">
            <div class="wizard-step-indicator">
              <span class="step-pill-indicator">4 / 5</span>
              <button class="speaker-btn" id="speakStepBtn" title="${t('listen_voice')}">🔊</button>
            </div>
            <h2 class="wizard-title">${t("step4_title")}</h2>
            <p class="wizard-subtitle">${t("step4_sub")}</p>
          </div>

          <!-- Mandi Benchmark Guidance -->
          <div class="price-benchmark-card">
            <div class="price-benchmark-title">
              <span>💡</span>
              <span>${t("mandi_benchmark")}</span>
            </div>
            <p class="price-benchmark-text">
              చేవెళ్ళ & బోయిన్‌పల్లి మండీలలో నేటి సగటు ధర ₹28 - ₹32/కిలో గా ఉంది.
            </p>
          </div>

          <div class="card card-warm" style="text-align: center; padding: 24px 16px;">
            <span style="font-size: 14px; font-weight: 700; color: var(--text-muted);">${t("price_label")}</span>

            <div class="stepper-container">
              <button class="stepper-btn" id="priceMinusBtn">−</button>
              <div class="stepper-value-box">
                <div class="stepper-number" id="priceNumberDisplay">₹${listingData.pricePerKg}</div>
                <div class="stepper-unit">${t("per_kg")}</div>
              </div>
              <button class="stepper-btn" id="pricePlusBtn">+</button>
            </div>

            <div style="background: white; border-radius: var(--radius-md); padding: 12px; margin-top: 16px; border: 1px solid var(--border-light);">
              <span style="font-size: 12px; color: var(--text-muted);">${t("total_expected_value")}</span>
              <div style="font-size: 22px; font-weight: 800; color: var(--primary-700); margin-top: 2px;" id="totalValDisplay">
                ₹${estimatedTotal.toLocaleString()}
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-secondary" id="backStepBtn" style="flex: 1;">
              ${t("back_btn")}
            </button>
            <button class="btn btn-primary" id="nextFromStep4Btn" style="flex: 2;">
              ${t("next_btn")} ➔
            </button>
          </div>
        </div>
      `;

      container.querySelector('#speakStepBtn')?.addEventListener('click', () => {
        speakPrompt(`${t('price_label')}: ₹${listingData.pricePerKg}. ${t('total_expected_value')}: ₹${listingData.quantity * listingData.pricePerKg}`);
      });

      const updateTotal = () => {
        const total = listingData.quantity * listingData.pricePerKg;
        container.querySelector('#totalValDisplay').innerText = `₹${total.toLocaleString()}`;
      };

      container.querySelector('#priceMinusBtn')?.addEventListener('click', () => {
        if (listingData.pricePerKg > 10) {
          listingData.pricePerKg -= 1;
          container.querySelector('#priceNumberDisplay').innerText = `₹${listingData.pricePerKg}`;
          updateTotal();
        }
      });

      container.querySelector('#pricePlusBtn')?.addEventListener('click', () => {
        listingData.pricePerKg += 1;
        container.querySelector('#priceNumberDisplay').innerText = `₹${listingData.pricePerKg}`;
        updateTotal();
      });

      container.querySelector('#backStepBtn')?.addEventListener('click', () => {
        currentStep = 3;
        render();
      });

      container.querySelector('#nextFromStep4Btn')?.addEventListener('click', () => {
        currentStep = 5;
        render();
        speakPrompt(`${t('step5_title')}. ${t('step5_sub')}`);
      });
    }

    // -------------------------------------------------------------
    // Step 5: Location & Review Summary
    // -------------------------------------------------------------
    else if (currentStep === 5) {
      const estimatedTotal = listingData.quantity * listingData.pricePerKg;
      const userLoc = store.getState().userLocation;

      container.innerHTML = `
        <div class="fade-in-enter">
          <div class="wizard-header">
            <div class="wizard-step-indicator">
              <span class="step-pill-indicator">5 / 5</span>
              <button class="speaker-btn" id="speakStepBtn" title="${t('listen_voice')}">🔊</button>
            </div>
            <h2 class="wizard-title">${t("step5_title")}</h2>
            <p class="wizard-subtitle">${t("step5_sub")}</p>
          </div>

          <!-- Review Card -->
          <div class="card" style="margin-bottom: 16px; border: 2px solid var(--primary-200);">
            <div style="display: flex; gap: 14px; margin-bottom: 14px;">
              <img src="${listingData.image}" alt="Crop" class="listing-thumb-img" style="width: 80px; height: 80px;" onerror="this.src='assets/tomatoes.jpg'" />
              <div>
                <h3 style="font-size: 18px; font-weight: 800; color: var(--text-primary);">${listingData.cropName[lang] || listingData.cropName.te}</h3>
                <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                  <span class="scenario-badge" style="background: var(--primary-700);">Grade ${listingData.grade}</span>
                  <span style="font-size: 12px; color: var(--text-muted);">${listingData.variety}</span>
                </div>
                <div class="price-highlight" style="margin-top: 4px;">₹${listingData.pricePerKg} /kg</div>
              </div>
            </div>

            <div style="background: var(--bg-subtle); border-radius: var(--radius-md); padding: 12px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
              <div>
                <span style="font-size: 11px; color: var(--text-muted);">${t("quantity_label")}</span>
                <div style="font-size: 16px; font-weight: 800; color: var(--text-primary);">${listingData.quantity} kg</div>
              </div>
              <div>
                <span style="font-size: 11px; color: var(--text-muted);">${t("total_expected_value")}</span>
                <div style="font-size: 16px; font-weight: 800; color: var(--primary-700);">₹${estimatedTotal.toLocaleString()}</div>
              </div>
            </div>

            <!-- GPS Auto-detected Location -->
            <div style="margin-top: 14px; padding-top: 12px; border-top: 1px solid var(--border-light); font-size: 13px; color: var(--text-secondary);">
              <span style="font-weight: 700; color: var(--text-primary);">📍 పికప్ లొకేషన్:</span> ${userLoc.address || "చేవెళ్ళ గ్రామం, రంగారెడ్డి"}
            </div>
          </div>

          <!-- Add Another Product Button -->
          <button class="btn btn-secondary btn-full" id="addAnotherBtn" style="margin-bottom: 12px;">
            ${t("add_another_product")}
          </button>

          <!-- Publish Button -->
          <button class="btn btn-primary btn-full btn-lg" id="publishListingBtn">
            ${t("publish_listing_btn")} ➔
          </button>
        </div>
      `;

      container.querySelector('#speakStepBtn')?.addEventListener('click', () => {
        speakPrompt(`${t('step5_title')}. ${listingData.quantity} ${t('kg')} ${listingData.cropName[lang] || listingData.cropName.te}. ${t('total_expected_value')}: ₹${estimatedTotal}`);
      });

      container.querySelector('#addAnotherBtn')?.addEventListener('click', () => {
        store.addListing(listingData);
        // Reset for another produce
        currentStep = 1;
        listingData.cropKey = "chilli";
        listingData.cropName = { te: "పచ్చిమిర్చి", hi: "हरी मिर्च", en: "Green Chilli" };
        listingData.image = "assets/chillies.jpg";
        listingData.grade = "A";
        listingData.quantity = 50;
        listingData.pricePerKg = 45;
        render();
      });

      container.querySelector('#publishListingBtn')?.addEventListener('click', () => {
        store.addListing(listingData);
        currentStep = 6; // Success
        render();
        speakPrompt(`${t('listing_success_title')}. ${t('listing_success_desc')}`);
      });
    }

    // -------------------------------------------------------------
    // Step 6: Listing Success Celebration
    // -------------------------------------------------------------
    else if (currentStep === 6) {
      container.innerHTML = `
        <div class="fade-in-enter" style="text-align: center; padding: 24px 10px;">
          <div style="font-size: 64px; margin-bottom: 12px; animation: bounce 1s infinite alternate;">
            🎉
          </div>

          <h2 style="font-size: 24px; font-weight: 800; color: var(--primary-900); margin-bottom: 8px;">
            ${t("listing_success_title")}
          </h2>
          <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 24px;">
            ${t("listing_success_desc")}
          </p>

          <div class="card card-warm" style="margin-bottom: 24px; text-align: left;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 12px; font-weight: 700; color: var(--text-muted);">${t("listing_id_label")}</span>
              <span class="scenario-badge">LST-LIVE</span>
            </div>
            <div style="font-size: 16px; font-weight: 800; color: var(--text-primary);">
              ${listingData.quantity} kg ${listingData.cropName[lang] || listingData.cropName.te} @ ₹${listingData.pricePerKg}/kg (Grade ${listingData.grade})
            </div>
            <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
              📍 చేవెళ్ళ • 15 km పరిధిలోని సప్లయర్లకు తక్షణ నోటిఫికేషన్ చేరింది
            </div>
          </div>

          <button class="btn btn-primary btn-full btn-lg" id="backToHomeFromSuccessBtn">
            ${t("go_to_home_btn")} ➔
          </button>
        </div>
      `;

      container.querySelector('#backToHomeFromSuccessBtn')?.addEventListener('click', () => {
        store.setView('farmer_home');
      });
    }
  }

  render();
}
