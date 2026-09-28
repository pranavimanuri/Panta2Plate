/**
 * Panta2Plate - Farmer-First Multilingual Speech & Voice Engine
 * Strictly targets te-IN, hi-IN, and en-IN
 * Gracefully provides visual fallback if an Indian voice pack is not installed on the OS/Browser
 */

import { getLang, t } from './i18n.js';

class SpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.isSpeaking = false;
    this.voicesLoaded = false;
    this.initVoices();
  }

  initVoices() {
    if (!this.synth) return;

    const populate = () => {
      this.voices = this.synth.getVoices();
      if (this.voices && this.voices.length > 0) {
        this.voicesLoaded = true;
      }
    };

    populate();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = populate;
    }
  }

  getBestVoiceForLang(langCode) {
    if (!this.synth) return null;
    const voices = this.synth.getVoices();
    if (!voices || voices.length === 0) return null;

    // Normalization mapping
    const targetPrefix = langCode === 'te' ? 'te' : langCode === 'hi' ? 'hi' : 'en';

    // 1. Exact BCP-47 match (e.g. te-IN, hi-IN, en-IN)
    let match = voices.find(v => v.lang.toLowerCase() === `${targetPrefix}-in`.toLowerCase());
    if (match) return match;

    // 2. Language prefix match (e.g. te, hi, en)
    match = voices.find(v => v.lang.toLowerCase().startsWith(targetPrefix));
    if (match) return match;

    // 3. Name match for regional voice packs (e.g., "Telugu", "Hindi")
    if (targetPrefix === 'te') {
      match = voices.find(v => v.name.toLowerCase().includes('telugu'));
      if (match) return match;
    }
    if (targetPrefix === 'hi') {
      match = voices.find(v => v.name.toLowerCase().includes('hindi'));
      if (match) return match;
    }

    return null; // Return null so we NEVER speak Telugu/Hindi with an English voice!
  }

  speak(text, customLang = null) {
    if (!text) return;
    const lang = customLang || getLang();

    // 1. Always trigger the prominent visual caption bubble
    window.dispatchEvent(new CustomEvent("panta:speech_bubble", {
      detail: { text, lang }
    }));

    if (!this.synth) {
      this.showVoiceUnavailableToast(lang, "Speech synthesis not supported in this browser");
      return;
    }

    const langCodes = {
      te: 'te-IN',
      hi: 'hi-IN',
      en: 'en-IN'
    };

    const targetLangCode = langCodes[lang] || 'en-IN';
    const voice = this.getBestVoiceForLang(lang);

    // CRITICAL: If Telugu or Hindi is selected but no corresponding voice pack is installed on the device,
    // DO NOT silently speak English! Show clear visual feedback and fallback gracefully.
    if ((lang === 'te' || lang === 'hi') && !voice) {
      const langName = lang === 'te' ? 'Telugu (తెలుగు)' : 'Hindi (हिन्दी)';
      console.info(`Voice engine: ${langName} audio voice pack is not installed on this device. Displaying visually.`);
      
      // Dispatch event for UI banner
      window.dispatchEvent(new CustomEvent("panta:voice_missing", {
        detail: { lang, langName }
      }));

      this.showVoiceUnavailableToast(
        lang,
        lang === 'te' 
          ? "ఈ పరికరంలో తెలుగు వాయిస్ అందుబాటులో లేదు. వచనం స్క్రీన్‌పై చూపబడుతోంది."
          : "इस डिवाइस पर हिंदी वॉइस उपलब्ध नहीं है। टेक्स्ट स्क्रीन पर दिखाया जा रहा है।"
      );
      return;
    }

    try {
      this.synth.cancel(); // Cancel any existing speech

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.90; // Slower, clearer pace tailored for farmers
      utterance.pitch = 1.0;
      utterance.lang = targetLangCode;

      if (voice) {
        utterance.voice = voice;
      }

      this.isSpeaking = true;
      window.dispatchEvent(new CustomEvent("panta:speech_state", { detail: { speaking: true } }));

      utterance.onend = () => {
        this.isSpeaking = false;
        window.dispatchEvent(new CustomEvent("panta:speech_state", { detail: { speaking: false } }));
      };

      utterance.onerror = (err) => {
        console.warn("Speech synthesis playback event:", err);
        this.isSpeaking = false;
        window.dispatchEvent(new CustomEvent("panta:speech_state", { detail: { speaking: false } }));
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.warn("Speech synthesis exception:", e);
      this.isSpeaking = false;
      window.dispatchEvent(new CustomEvent("panta:speech_state", { detail: { speaking: false } }));
    }
  }

  showVoiceUnavailableToast(lang, message) {
    window.dispatchEvent(new CustomEvent("panta:toast", {
      detail: {
        title: lang === 'te' ? "వాయిస్ నోటీస్ (Voice Notice)" : "Voice Notice",
        message: message || "Voice pack not available on device. Text displayed visually.",
        type: "info"
      }
    }));
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      window.dispatchEvent(new CustomEvent("panta:speech_state", { detail: { speaking: false } }));
    }
  }
}

export const speechEngine = new SpeechEngine();

export function speakPrompt(text, customLang = null) {
  speechEngine.speak(text, customLang);
}

export function stopSpeech() {
  speechEngine.stop();
}
