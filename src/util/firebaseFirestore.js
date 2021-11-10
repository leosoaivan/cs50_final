import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
 } from "firebase/firestore";
import app from './firebase';

const db = getFirestore(app);

export const createUserProfile = async (user) => {
  const userQuery = query(collection(db, 'users'), where('uid', '==', user.uid))
  const querySnapshot = await getDocs(userQuery);

  if (!querySnapshot.docs.length) {
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

export const createQuestion = async (opts) => {
  const { user, question, answer } = opts

  if (!user || !question || !answer) {
    throw new Error('Invalid question/answer')
  }

  await addDoc(collection(db, 'questions'), {
    question: question,
    answer: answer,
    uid: user.uid,
    datetime: Date.now(),
  })
}

export const getAllUserEntries = async (user) => {
  const { uid } = user
  const questionsRef = collection(db, 'questions')
  const q = query(questionsRef, where('uid', '==', uid), orderBy('datetime'), limit(10))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(snapshot => ({...snapshot.data(), id: snapshot.id }));
}
