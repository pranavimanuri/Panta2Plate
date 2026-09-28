/**
 * Panta2Plate - Spoken Audio Caption / Visualizer Overlay
 */

import { t } from '../i18n.js';
import { stopSpeech } from '../speech.js';

let bubbleTimer = null;

export function initSpeechBubble(container) {
  window.addEventListener("panta:speech_bubble", (event) => {
    const { text, lang } = event.detail;
    if (!text) return;

    if (bubbleTimer) clearTimeout(bubbleTimer);

    container.innerHTML = `
      <div class="speech-bubble-toast">
        <div class="speech-bubble-icon">
          <div class="voice-wave">
            <div class="voice-bar"></div>
            <div class="voice-bar"></div>
            <div class="voice-bar"></div>
            <div class="voice-bar"></div>
          </div>
        </div>
        <div class="speech-bubble-content">
          <div class="speech-bubble-header">
            <span class="speech-bubble-title">🔊 ${t('voice_assistant')}</span>
            <button class="speech-bubble-close" id="closeSpeechBubble">✕</button>
          </div>
          <p class="speech-bubble-text">${text}</p>
        </div>
      </div>
    `;

    container.querySelector('#closeSpeechBubble')?.addEventListener('click', () => {
      stopSpeech();
      container.innerHTML = '';
    });

    // Auto dismiss after 6.5s
    bubbleTimer = setTimeout(() => {
      container.innerHTML = '';
    }, 6500);
  });
}
