import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { Divider } from 'react95';
import { format } from 'date-fns-tz'

import { getForumEntries } from '../../util/firebaseFirestore';

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

function Forum() {
  const [ entries, setEntries ] = useState([])
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const forumEntries = await getForumEntries();
        setEntries(forumEntries)
      } catch (e) {
        console.error(e)
      }
    }

    fetchInitialData();

    const id = setInterval(async () => {
      console.log('Fetching data...')
      await fetchInitialData();
    }, 10000);

    return () => {
      clearInterval(id)
    }
  }, [])

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
    <div>
      Forum
      { renderEntries() }
    </div>
  )
}

export default Forum;
