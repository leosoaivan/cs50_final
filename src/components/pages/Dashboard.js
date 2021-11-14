import React, { useCallback, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from 'styled-components';
import {
  Window,
  WindowContent,
  WindowHeader,
} from 'react95';

import UserContext from '../../context/UserContext';
import { auth } from "../../util/firebaseAuth";
import { getUserProfile } from '../../util/firebaseFirestore';
import CustomToolbar from '../CustomToolbar';
import MagicBall from '../MagicBall';

const Root = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  #toolbar button:nth-of-type(1) {
    margin-right: 8px;
  }
`

const Greeting = styled.div`
  margin-bottom: 24px;
`

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
    <Root>
      <Window style={{ width: '33%', minWidth: '356px' }}>
        <WindowHeader className='window-header'>
          <span>magic8ball.exe</span>
        </WindowHeader>
        <CustomToolbar handleLogout={handleLogout} />
        <WindowContent>
          <Greeting>
            Welcome, {profile?.name}
          </Greeting>
          <MagicBall />
        </WindowContent>
      </Window>
    </Root>
  );
}
export default Dashboard;
