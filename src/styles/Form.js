import styled, { css } from 'styled-components';

const authFormStyles = css`
  fieldset {
    margin-bottom: 24px;
  }

  .button-row {
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
  }

  .button-row button:nth-of-type(2) {
    margin-top: 12px;
  }
`

const Form = styled.form`
  ${authFormStyles}
`

export default Form;
