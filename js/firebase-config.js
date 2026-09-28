/**
 * Panta2Plate - Firebase & Firestore Configuration
 * Provides unified interface for Cloud Firestore with resilient offline synchronization
 */

export const FIREBASE_CONFIG = {
  apiKey: window.PANTA_FIREBASE_API_KEY || "",
  authDomain: window.PANTA_FIREBASE_AUTH_DOMAIN || "panta2plate-prod.firebaseapp.com",
  projectId: window.PANTA_FIREBASE_PROJECT_ID || "panta2plate-prod",
  storageBucket: window.PANTA_FIREBASE_STORAGE_BUCKET || "panta2plate-prod.appspot.com",
  messagingSenderId: window.PANTA_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: window.PANTA_FIREBASE_APP_ID || ""
};

/**
 * Collection Names Schema
 */
export const COLLECTIONS = {
  USERS: 'users',
  FARMER_LISTINGS: 'farmerListings',
  PICKUP_REQUESTS: 'pickupRequests',
  INVENTORY: 'inventory',
  RESTAURANT_ORDERS: 'restaurantOrders',
  PRODUCT_REQUESTS: 'productRequests',
  NOTIFICATIONS: 'notifications'
};

export const isFirebaseConfigured = () => {
  return Boolean(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId);
};
