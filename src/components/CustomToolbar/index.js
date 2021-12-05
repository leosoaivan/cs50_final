import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router";
import {
  Toolbar,
  Button,
  List,
  ListItem,
  Divider,
} from 'react95';

const Dropdown = styled.div`
  position: relative;
`

function CustomToolbar({ handleLogout }) {
  const [open, setOpen] = useState(false)
  const history = useHistory();

  return (
    <Toolbar>
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
            <ListItem
              size='sm'
              onClick={() => history.replace('/')}
            >
              Dashboard
            </ListItem>
            <Divider />
            <ListItem
              size='sm'
              onClick={() => history.replace('/forum')}
            >
              Forum
            </ListItem>
            <Divider />
            <ListItem
              size='sm'
              onClick={() => history.replace('/settings')}
            >
              Settings
            </ListItem>
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
  )
}

export default CustomToolbar;
