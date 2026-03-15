import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

export { RecaptchaVerifier, signInWithPhoneNumber, isSignInWithEmailLink, signInWithEmailLink, sendSignInLinkToEmail, GoogleAuthProvider, signInWithPopup };
