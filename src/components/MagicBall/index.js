import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  Fieldset,
  TextField,
} from 'react95';

import UserContext from '../../context/UserContext';
import Entry from '../Entry';
import Header from '../Header';
import answers from "./answers";
import { createQuestion, getAllUserEntries } from '../../util/firebaseFirestore';

const Form = styled.form`
  margin-bottom: 24px;
`

const LengthIndicator = styled.div`
  display: flex;
  justify-content: flex-end;
  color: gray;
  font-size: 0.85em;
`

function MagicBall() {
  const [question, setQuestion] = useState('')
  const [entries, setEntries] = useState([])
  const [disableInput, setDisableInput] = useState(false)
  const user = useContext(UserContext)
  const ref = useRef(null)

  useEffect(() => {
    let isMounted = true;
    ref.current.focus();

    const fetchInitialData = async () => {
      try {
        const userEntries = await getAllUserEntries(user);

        if (isMounted) {
          setEntries(userEntries)
        }
      } catch (e) {
        console.error(e)
      }
    }

    fetchInitialData();

    return () => {
      isMounted = false;
    }
  }, [user])

  useEffect(() => {
    if (user && user?.providerData[0]?.providerId === 'password' && !user.emailVerified) {
      setDisableInput(true)
    }
  }, [user])

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
      const data = await getAllUserEntries(user)
      setEntries(data)
    } catch (e) {
      alert('Error: ', e)
    }
    setQuestion('')
  }

  function generateAnswer() {
    return answers[Math.floor(Math.random() * answers.length)]
  }

  function renderEntries() {
    return entries.map(entry => <Entry key={`entry_${entry.id}`} entry={entry} />)
  }

  return (
    <React.Fragment>
      <Header>the truth</Header>
      <Form onSubmit={handleOnSubmit}>
        <Fieldset>
          <TextField
            ref={ref}
            type="text"
            name="question"
            value={question}
            onChange={handleOnChange}
            maxLength="100"
            placeholder={disableInput ? 'Verify your email to ask a question' : ''}
            disabled={disableInput}
          />
        </Fieldset>
        <LengthIndicator>
          {question.length}/100
        </LengthIndicator>
      </Form>
      <Header>history</Header>
      <div style={{ width: '100%' }}>
        { entries.length > 0 && renderEntries() }
      </div>
    </React.Fragment>
  )
}

export default MagicBall;
