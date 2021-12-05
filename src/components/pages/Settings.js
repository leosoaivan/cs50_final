import React, { useContext } from 'react';
import styled from 'styled-components/macro';
import { useHistory } from "react-router";
import {
  Button,
} from 'react95'

import UserContext from '../../context/UserContext';
import {
  auth,
  deleteUser,
} from '../../util/firebaseAuth';

const Header = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.25em;
`

function Forum() {
  const user = useContext(UserContext);
  const history = useHistory();

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm('Confirm to delete your account. Your questions will not be deleted, but will be anonymized')

    if (confirmation) {
      try {
        await deleteUser(user)
        await auth.signOut()
        history.replace("/")
      } catch (e) {
        throw new Error('Could not delete user: ', JSON.stringify(e))
      }
    }
  }

  return (
    <div>
      <Header>
        Settings
      </Header>
      <Button onClick={handleDeleteAccount}>
        Delete Account
      </Button>

    </div>
  )
}

export default Forum;
