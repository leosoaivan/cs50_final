import React from 'react';
import styled from 'styled-components/macro';
import { Divider } from 'react95';
import { format } from 'date-fns-tz'

const Root = styled.div`
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

function Entry(props) {
  const {
    entry,
    initials,
  } = props;

  const formattedDate = format(new Date(entry.datetime), "MM/dd/yyyy")

  return (
    <Root>
      <Question>{`${entry.question}`}</Question>
      <br />
      <EntryDate>{`${formattedDate}${initials && ` by ${initials}`}`}</EntryDate>
      <br />
      <Answer>
        {entry.answer}
      </Answer>
      <br />
      <Divider />
    </Root>
  )

}

export default Entry;
