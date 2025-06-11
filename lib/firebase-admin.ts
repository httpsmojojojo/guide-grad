import admin from 'firebase-admin'

// Initialize Firebase Admin for server-side
const adminApp = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    })
  : admin.app()

const adminAuth = admin.auth(adminApp)
const adminDb = admin.firestore(adminApp)
const adminStorage = admin.storage(adminApp)

export {
  adminApp,
  adminAuth,
  adminDb,
  adminStorage,
} 