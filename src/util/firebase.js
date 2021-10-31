import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, addDoc, query, where } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjWZd5TI94LQHLnbF9yl9ZY2VyfMRcTWk",
  authDomain: "cs50-final-project-1fa35.firebaseapp.com",
  projectId: "cs50-final-project-1fa35",
  storageBucket: "cs50-final-project-1fa35.appspot.com",
  messagingSenderId: "302107833643",
  appId: "1:302107833643:web:2849436724812afd16816e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = res.user;
    const userQuery = query(collection(db, 'users'), where('uid', '==', user.uid))
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.length) {
      await addDoc(doc(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
    }
  } catch (err) {
    console.error(err);
  }
};

const signInWithEmail = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const createUserWithEmail = async (name, email, password) => {
  try {
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    const user = credentials.user;

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'email',
      email,
    })
  } catch (err) {
    console.error(err);
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(email);
  } catch (err) {
    console.error(err);
  }
};


export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmail,
  createUserWithEmail,
  sendPasswordResetEmail,
};
