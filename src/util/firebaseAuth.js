import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { createUserProfile } from './firebaseFirestore';
import app from './firebase'

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, provider);
    const user = { ...res.user, loginType: 'google' };
    await createUserProfile(user)
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
    const user = { ...credentials.user, name: name, loginType: 'email' };

    await createUserProfile(user)
  } catch (err) {
    console.error(err);
  }
}

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (err) {
    console.error(err)
  }
}

export {
  auth,
  signInWithGoogle,
  signInWithEmail,
  createUserWithEmail,
  sendPasswordReset,
};
