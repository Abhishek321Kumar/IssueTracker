import React from 'react';



function IssueRow({ issue }) {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.title}</td>
      <td>{issue.owner}</td>
      <td>{issue.status}</td>
      <td>{issue.effort}</td>
      <td>{new Date(issue.created).toDateString()}</td>
      <td>
        {issue.due ? new Date(issue.due).toDateString() : ''}
      </td>
    </tr>
  );
}

function IssueTable({ issues }) {
  return (
    <table border="1">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Owner</th>
          <th>Status</th>
          <th>Effort</th>
          <th>Created</th>
          <th>Due</th>
        </tr>
      </thead>

      <tbody>
        {issues.map(issue => (
          <IssueRow key={issue.id} issue={issue} />
        ))}
      </tbody>
    </table>
  );
}

export default IssueTable;