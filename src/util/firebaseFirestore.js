import { getFirestore, collection, getDocs, addDoc, query, where } from "firebase/firestore";
import app from './firebase';

const db = getFirestore(app);

export const createUserProfile = async (user) => {
  const userQuery = query(collection(db, 'users'), where('uid', '==', user.uid))
  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.length) {
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: user.name || user.displayName,
      authProvider: user.loginType,
      email: user.email,
    })
  }
}

export const getUserProfile = async (user) => {
  if (!user) {
    throw new Error('Invalid user')
  }
  const usersRef = collection(db, 'users')
  const q = query(usersRef, where('uid', '==', user.uid))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs[0]?.data();
}
