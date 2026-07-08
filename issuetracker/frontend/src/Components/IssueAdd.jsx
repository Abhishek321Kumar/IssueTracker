import React, { useState } from 'react';

function IssueAdd({ createIssue }) {
  const [owner, setOwner] = useState('');
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    const newIssue = {
      status: 'New',
      owner,
      effort: 5,
      title,
    };

    createIssue(newIssue);

    setOwner('');
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Owner"
        value={owner}
        onChange={e => setOwner(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <button type="submit">
        Add Issue
      </button>
    </form>
  );
}

export default IssueAdd;