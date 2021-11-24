import React, { useCallback, useEffect, useState, useContext } from "react";
import styled from 'styled-components';

import UserContext from '../../context/UserContext';
import { getUserProfile } from '../../util/firebaseFirestore';
import MagicBall from '../MagicBall';

const Greeting = styled.div`
  margin-bottom: 24px;
`

function Dashboard() {
  const user = useContext(UserContext)
  const [profile, setProfile] = useState(undefined);

  const memoizedFetchUserProfile = useCallback(async (isMounted) => {
    try {
      const data = await getUserProfile(user)
      if (isMounted) {
        setProfile(data)
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  }, [user])

  useEffect(() => {
    let isMounted = true
    if (user && !profile) {
      memoizedFetchUserProfile(isMounted)
    }

    return () => {
      isMounted = false;
    }
  }, [user, profile, memoizedFetchUserProfile]);

  return (
    <React.Fragment>
      <Greeting>
        Welcome, {profile?.name}
      </Greeting>
      <MagicBall />
    </React.Fragment>
  );
}
export default Dashboard;
