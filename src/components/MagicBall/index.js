import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  Fieldset,
  TextField,
} from 'react95';
import { format } from 'date-fns-tz'

import UserContext from '../../context/UserContext';
import answers from "./answers";
import { createQuestion, getAllUserEntries } from '../../util/firebaseFirestore';

const LengthIndicator = styled.div`
  display: flex;
  justify-content: flex-end;
  color: gray;
  font-size: 0.85em;
`

function MagicBall() {
  const [question, setQuestion] = useState('')
  const [entries, setEntries] = useState([])
  const user = useContext(UserContext)
  const ref = useRef(null)

  useEffect(() => {
    ref.current.focus();

    const fetchInitialData = async () => {
      try {
        const userEntries = await getAllUserEntries(user);
        setEntries(userEntries)
      } catch (e) {
        console.error(e)
      }
    }

    fetchInitialData();
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
    return entries.map((entry) => {
      const formattedDate = format(new Date(entry.datetime), "MM/dd/yyyy")

      return (
        <React.Fragment key={`entry_${entry.id}`}>
          <div>
            {`${entry.question} on ${formattedDate}`}
          </div>
          <div>
            {entry.answer}
          </div>
        </React.Fragment>
      )
    })
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
      <div>
        { entries && renderEntries() }
      </div>
    </React.Fragment>
  )
}

export default MagicBall;
