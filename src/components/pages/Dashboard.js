import React, { useCallback, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router";
import styled from 'styled-components';
import {
  Button,
  Divider,
  List,
  ListItem,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from 'react95';

import UserContext from '../../context/UserContext';
import { auth } from "../../util/firebaseAuth";
import { getUserProfile } from '../../util/firebaseFirestore';
import MagicBall from '../MagicBall';

const Root = styled.div`
  #toolbar button:nth-of-type(1) {
    margin-right: 8px;
  }
`

const Dropdown = styled.div`
  position: relative;
`

function Dashboard() {
  const user = useContext(UserContext)
  const [open, setOpen] = useState(false);
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
      <Window>
        <WindowHeader className='window-header'>
          <span>magic8ball.exe</span>
        </WindowHeader>
        <Toolbar id="toolbar">
          <Dropdown>
            <Button
              variant='menu'
              size='sm'
              onClick={() => setOpen(!open)}
              active={open}
            >
              <u>G</u>o To
            </Button>
            {open && (
              <List
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '100%',
                  zIndex: '9999'
                }}
                open={open}
                onClick={() => setOpen(false)}
              >
                <ListItem size='sm'>Dashboard</ListItem>
                <Divider />
                <ListItem size='sm'>Forum</ListItem>
              </List>
            )}
          </Dropdown>
          <Button
            variant='menu'
            size='sm'
            onClick={handleLogout}
          >
            <u>L</u>ogout
          </Button>
        </Toolbar>
        <WindowContent>
          <div>
            Welcome, {profile?.name}
          </div>
          <MagicBall />
        </WindowContent>
      </Window>
    </Root>
  );
}
export default Dashboard;
