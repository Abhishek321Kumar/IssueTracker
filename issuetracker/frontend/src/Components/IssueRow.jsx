function IssueRow({ issue }) {
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.title}</td>
      <td>{issue.owner}</td>
      <td>{issue.status}</td>
      <td>{issue.effort}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.due ? issue.due.toDateString() : ''}</td>
    </tr>
  );
}

export default IssueRow