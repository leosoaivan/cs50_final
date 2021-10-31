import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth, db } from "../../util/firebase";
import { getFirestore, collection, getDocs, doc, addDoc, query, where } from "firebase/firestore";

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName();
  }, [user, loading, history]);

  const fetchUserName = async () => {
    try {
      // const query = await db
      //   .collection("users")
      //   .where("uid", "==", user?.uid)
      //   .get();
      const q = query(collection(db, 'users'), where('uid', '==', user?.uid))
      const data = await getDocs(q)
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  const handleLogout = () => {
    auth.signOut();
  }

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        Logged in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className="dashboard__btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Dashboard;