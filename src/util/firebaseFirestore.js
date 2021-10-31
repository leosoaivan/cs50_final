import { getFirestore, collection, getDocs, doc, addDoc, query, where } from "firebase/firestore";
import app from './firebase';

const db = getFirestore(app);

export const createUserProfile = async (user) => {
  const userQuery = query(collection(db, 'users'), where('uid', '==', user.uid))
  const querySnapshot = await getDocs(userQuery);

  console.log('SNAP: ', querySnapshot)

  if (!querySnapshot.length) {

    console.log('USER NOT FOUND IN DB')

    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name: user.loginType === 'google' ? user.displayName : user.name,
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

  console.log("SNAPSHOT: ", querySnapshot)

  return querySnapshot.docs[0]?.data();
}
