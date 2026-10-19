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
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL

    // Критически важно: Vercel передает переменные окружения в виде строк,
    // поэтому мы заменяем текстовые \n на реальные переносы строк.
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n")

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error(
        "[firebase] Отсутствуют переменные окружения (FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY)",
      )
    }

    globalRef.kvartaFirebaseApp = initializeApp(
      {
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      },
      "kvarta",
    )
  }

  return getFirestore(globalRef.kvartaFirebaseApp)
}
