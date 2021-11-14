import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import {
  Fieldset,
  TextField,
  Divider,
} from 'react95';
import { format } from 'date-fns-tz'

import UserContext from '../../context/UserContext';
import answers from "./answers";
import { createQuestion, getAllUserEntries } from '../../util/firebaseFirestore';

const Header = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.25em;
`

const LengthIndicator = styled.div`
  display: flex;
  justify-content: flex-end;
  color: gray;
  font-size: 0.85em;
`

const Entry = styled.div`
  padding: 8px;
`

const Question = styled.span`
  font-weight: 600;
`

const EntryDate = styled.span`
  color: gray;
  font-size: .85em;
`

const Answer = styled.span`
  font-style: italic;
`;

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
        <Entry key={`entry_${entry.id}`}>
          <Question>{`${entry.question}`}</Question>
          <br />
          <EntryDate>{`${formattedDate}`}</EntryDate>
          <br />
          <Answer>
            {entry.answer}
          </Answer>
          <br />
          <Divider />
        </Entry>
      )
    })
  }

  return (
    <React.Fragment>
      <Header>the truth</Header>
      <form onSubmit={handleOnSubmit}>
        <Fieldset>
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
      <Header>history</Header>
      <div style={{ width: '100%' }}>
        { entries && renderEntries() }
      </div>
    </React.Fragment>
  )
}

export default MagicBall;
