import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
  doc,
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

export const deleteUserProfile = async (user) => {
  const userRef = collection(db, 'users')
  const userQuery = query(userRef, where('uid', '==', user.uid))
  const snapshots = await getDocs(userQuery)
  const deletes = snapshots.docs.map((document) => deleteDoc(doc(db, "users", document.id)));

  Promise.all(deletes)
    .catch(console.log)
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
  const q = query(questionsRef, where('uid', '==', uid), orderBy('datetime', "desc"), limit(10))
  const querySnapshot = await getDocs(q)

  return querySnapshot.docs.map(snapshot => ({...snapshot.data(), id: snapshot.id }));
}

export const getForumEntries = async () => {
  const usersRef = collection(db, 'users')
  const questionsRef = collection(db, 'questions')
  const q = query(questionsRef, orderBy('datetime', "desc"), limit(10))
  const questionQuerySnapshot = await getDocs(q)

  const results = questionQuerySnapshot.docs.map(async (snapshot) => {
    try {
      const data = snapshot.data();
      const { uid } = data;
      const q = query(usersRef, where('uid', '==', uid))
      const userQuerySnapshot = await getDocs(q)
      const userData = userQuerySnapshot.docs[0]?.data();

      return {...data, id: snapshot.id,  user: userData };
    } catch (e) {
      throw e
    }
  })

  return Promise.all(results)
}
