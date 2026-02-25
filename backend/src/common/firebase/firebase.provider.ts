import * as admin from 'firebase-admin';

// Provides a Firestore instance for injection.
//
// Currently this uses a mock/hard-coded service-account-like object so you
// can run locally without wiring env vars. Replace these values with a real
// service account or switch to GOOGLE_APPLICATION_CREDENTIALS in production.
const MOCK_SERVICE_ACCOUNT = {};

export const FirestoreProvider = {
  provide: 'FIRESTORE',
  useFactory: () => {
    if (!admin.apps.length) {
      // Prefer real credentials if provided (GOOGLE_APPLICATION_CREDENTIALS),
      // otherwise fall back to the mock service account for local testing.
      try {
        if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
          // Let the Admin SDK pick up ADC from the env var / environment.
          admin.initializeApp();
        } else {
          // Initialize with the mock service account. Replace later.
          admin.initializeApp({
            credential: admin.credential.cert(
              MOCK_SERVICE_ACCOUNT as admin.ServiceAccount,
            ),
            projectId: MOCK_SERVICE_ACCOUNT.project_id,
          });
        }
      } catch (err) {
        // If initialization fails, attempt a plain initialize to surface
        // a useful error rather than crashing silently.
        try {
          admin.initializeApp();
        } catch (e) {
          // ignore - next call to admin.firestore() will produce a clearer error
        }
      }
    }
    return admin.firestore();
  },
};
