import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { auth } from "../../util/firebaseAuth";
import { getUserProfile } from '../../util/firebaseFirestore';

function Dashboard() {
  const [user, loading] = useAuthState(auth);
  const [profile, setProfile] = useState({});
  const history = useHistory();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      history.replace("/");
    } else {
      fetchUserName();
    }
  }, [user, loading, history]);

  const fetchUserName = async () => {
    try {
      const data = await getUserProfile(user)
      setProfile(data)
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
        <div>{profile?.name}</div>
        <div>{profile?.email}</div>
        <button className="dashboard__btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}
export default Dashboard;
