import styled from 'styled-components/macro';
import { Link } from 'react-router-dom';

const Anchor = styled(Link)`
  color: blue;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  &:visited {
    color: purple;
    text-decoration: underline;
    cursor: auto;
  }

  &:active {
    color: red;
  }
`;

export default Anchor;
