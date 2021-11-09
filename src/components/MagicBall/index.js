import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  Button,
  Fieldset,
  TextField,
} from 'react95';

import UserContext from '../../context/UserContext';
import answers from "./answers";
import { createQuestion } from '../../util/firebaseFirestore';

const LengthIndicator = styled.div`
  display: flex;
  justify-content: flex-end;
  color: gray;
  font-size: 0.85em;
`

function MagicBall() {
  const [question, setQuestion] = useState('')
  const user = useContext(UserContext)
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus();
  }, [])

  function handleOnChange(e) {
    const { value } = e.target
    setQuestion(value)
  }

  async function handleOnSubmit(e) {
    e.preventDefault();

    const normalizedQuestion = question.trim();
    const answer = generateAnswer();

    try {
      await createQuestion({
        user,
        question: normalizedQuestion,
        answer,
      })
    } catch (e) {
      alert('Error: ', e)
    }
    setQuestion('')
  }

  function generateAnswer() {
    return answers[Math.floor(Math.random() * answers.length)]
  }

  return (
    <React.Fragment>
      <form onSubmit={handleOnSubmit}>
        <Fieldset label="Ask">
          <TextField
            ref={ref}
            type="text"
            name="question"
            value={question}
            onChange={handleOnChange}
            maxLength="100"
          />
        </Fieldset>
        <LengthIndicator>
          {question.length}/100
        </LengthIndicator>
      </form>
    </React.Fragment>
  )
}

export default MagicBall;
