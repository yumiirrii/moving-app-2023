import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBsPNooUEBysKKkGm4UIXEMX-aKXP3yKa8',
  authDomain: 'moving-app-2023.firebaseapp.com',
  projectId: 'moving-app-2023',
  storageBucket: 'moving-app-2023.appspot.com',
  messagingSenderId: '747821745888',
  appId: '1:747821745888:web:f0fd0719a693c54b68f285',
  measurementId: 'G-QZ2H1J6X39'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const db = getFirestore(app)

export {
  db
}