import React, { useEffect, useState } from 'react';

import Entry from '../Entry'
import { getForumEntries } from '../../util/firebaseFirestore';

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
      Forum
      { renderEntries() }
    </div>
  )
}

export default Forum;
