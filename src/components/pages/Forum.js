import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';

import Entry from '../Entry'
import { getForumEntries } from '../../util/firebaseFirestore';

const Header = styled.div`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.25em;
`

function Forum() {
  const [ entries, setEntries ] = useState([])

  useEffect(() => {
    let isMounted = true;

    const fetchEntries = async () => {
      try {
        const forumEntries = await getForumEntries();

        if (isMounted) {
          setEntries(forumEntries)
        }
      } catch (e) {
        console.error('Error fetching entries: ', JSON.stringify(e))
      }
    }

    fetchEntries();

    return () => {
      isMounted = false
    }
  }, [])

  function renderEntries() {
    return entries.map(entry => (
      <Entry
        key={`entry_${entry.id}`}
        entry={entry}
        withInitials
      />
    ))
  }

  return (
    <div>
      <Header>
        Forum
      </Header>
      { renderEntries() }
    </div>
  )
}

export default Forum;
