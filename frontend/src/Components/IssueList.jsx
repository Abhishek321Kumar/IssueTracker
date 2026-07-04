import React, { useEffect, useState } from 'react';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
import IssueFilter from './IssueFilter';

function IssueList() {
  const [issues, setIssues] = useState([]);

  async function loadData() {
    const query = `
      query {
        issueList {
          id
          status
          owner
          effort
          created
          due
          title
        }
      }
    `;

    try {
      const response = await fetch('http://localhost:3001/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();

      setIssues(result.data.issueList);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function createIssue(issue) {
    const query = `
      mutation ($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
          id
        }
      }
    `;

    const variables = { issue };

    await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    loadData();
  }

  return (
    <>
      <h1>Issue Tracker</h1>
      <IssueFilter/>
      <IssueTable issues={issues} />
      <IssueAdd createIssue={createIssue} />
    </>
  );
}

export default IssueList;