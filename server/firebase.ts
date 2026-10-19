import { initializeApp, cert, type App } from "firebase-admin/app"
import { getFirestore, type Firestore } from "firebase-admin/firestore"

// Vercel переиспользует лямбды между запросами. Храним app в globalThis,
// чтобы firebase-admin инициализировался один раз на инстанс, а не на каждый
// запрос — это заметно экономит время холодных стартов.
const globalRef = globalThis as unknown as {
  kvartaFirebaseApp?: App
}

export function getDb(): Firestore {
  if (!globalRef.kvartaFirebaseApp) {
    const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT
    if (!serviceAccountRaw) {
      throw new Error("[firebase] FIREBASE_SERVICE_ACCOUNT is missing")
    }
    const serviceAccount = JSON.parse(serviceAccountRaw)

    globalRef.kvartaFirebaseApp = initializeApp(
      { credential: cert(serviceAccount) },
      "kvarta",
    )
  }
  return getFirestore(globalRef.kvartaFirebaseApp)
}
