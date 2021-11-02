import React, { useCallback, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import UserContext from '../../context/UserContext';
import { auth } from "../../util/firebaseAuth";
import { getUserProfile } from '../../util/firebaseFirestore';

function Dashboard() {
  const user = useContext(UserContext)
  const [profile, setProfile] = useState(undefined);
  const history = useHistory();

  const memoizedFetchUserProfile = useCallback(async () => {
    try {
      const data = await getUserProfile(user)
      setProfile(data)
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }, [user])

  useEffect(() => {
    if (user && !profile) {
      memoizedFetchUserProfile()
    }
  }, [user, profile, memoizedFetchUserProfile]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => history.replace("/"))
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
