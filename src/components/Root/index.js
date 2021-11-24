import styled from 'styled-components/macro'
import media from '../../styles/media'
import { Window } from 'react95';

const Root = styled(Window)`
  width: 100%;
  height: 100%;

  ${media.small`
    width: 500px;
    height: max-content;
  `}
`;

export default Root;