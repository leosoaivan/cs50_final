import React from 'react';
import PropTypes from 'prop-types';
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
    withInitials,
  } = props;
  const {
    user
  } = entry;

  const formattedDate = format(new Date(entry.datetime), "MM/dd/yyyy")
  const initials = user && user.name.match(/\b\w/gm).join('');
  const entryDetails = `${formattedDate}${withInitials ? ` by ${initials}` : ''}`

  return (
    <Root>
      <Question>{`${entry.question}`}</Question>
      <br />
      <EntryDate>{entryDetails}</EntryDate>
      <br />
      <Answer>
        {entry.answer}
      </Answer>
      <br />
      <Divider />
    </Root>
  )

}

Entry.propTypes = {
  entry: PropTypes.shape({
    answer: PropTypes.any,
    datetime: PropTypes.any,
    question: PropTypes.any,
    user: PropTypes.shape({
      name: PropTypes.shape({
        match: PropTypes.func
      })
    })
  }),
  withInitials: PropTypes.any
};

Entry.defaultProps = {
  withInitials: false,
}

export default Entry;
