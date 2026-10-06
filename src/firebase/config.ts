import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { getAuth, type Auth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, type Firestore, doc, getDocFromServer } from 'firebase/firestore';
import { getAnalytics, isSupported, logEvent, type Analytics } from 'firebase/analytics';
import rawFirebaseConfig from '../firebase-applet-config.json';

const envMeasurementId = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID;
const firebaseConfig = {
  ...rawFirebaseConfig,
  measurementId: envMeasurementId || rawFirebaseConfig.measurementId || '',
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null,
  authInstance?: Auth | null
) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: authInstance?.currentUser?.uid,
      email: authInstance?.currentUser?.email,
      emailVerified: authInstance?.currentUser?.emailVerified,
      isAnonymous: authInstance?.currentUser?.isAnonymous,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey !== '""' &&
  !firebaseConfig.apiKey.includes('PLACEHOLDER')
);

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let analytics: Analytics | null = null;

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

if (isFirebaseConfigured) {
  try {
    const existingApps = getApps();
    app = existingApps.length ? existingApps[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = firebaseConfig.firestoreDatabaseId
      ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
      : getFirestore(app);

    // Initialize Google Analytics for Firebase (100% Free on Spark plan)
    if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
      isSupported().then((supported) => {
        if (supported && app) {
          analytics = getAnalytics(app);
          logEvent(analytics, 'page_view');
        }
      }).catch((err) => {
        console.debug('Firebase Analytics is not supported in this environment:', err);
      });
    }

    // Validate connection to Firestore as required by Firebase skill
    const testConnection = async () => {
      try {
        if (db) {
          await getDocFromServer(doc(db, 'test', 'connection'));
        }
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.warn('Please check your Firebase configuration or network connection.');
        }
      }
    };
    testConnection();
  } catch (err) {
    console.warn('Firebase initialization error, falling back to local store:', err);
  }
}

/**
 * Safely track analytics events (100% free)
 */
export function trackEvent(eventName: string, params?: Record<string, any>) {
  if (analytics) {
    try {
      logEvent(analytics, eventName, params);
    } catch {
      // Ignore if analytics tracking fails or is blocked
    }
  }
}

export { app, auth, db, analytics };
