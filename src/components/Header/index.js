import React from 'react';
import styled from 'styled-components/macro';

const Root = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.25em;
  margin-bottom: 12px;
`

function Header({ children }) {
  return (
    <Root>
      { children }
    </Root>
  )
}

export default Header;
