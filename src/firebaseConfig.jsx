import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";  // Importar la funcionalidad de autenticación

const firebaseConfig = {
  apiKey: "AIzaSyC0fRAoBpU5--aqhvx3vX6iyjolPGDWzw8",
  authDomain: "crud-app-d9417.firebaseapp.com",
  projectId: "crud-app-d9417",
  storageBucket: "crud-app-d9417.firebasestorage.app",
  messagingSenderId: "673856207827",
  appId: "1:673856207827:web:45c94eadd5aa2aab68cd26",
  measurementId: "G-KKSTP4KKDY"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firebase Analytics
const analytics = getAnalytics(app);

// Inicializa Firebase Auth
const auth = getAuth(app);

export { app, analytics, auth };  // Exporta la autenticación para usarla en otros componentes
