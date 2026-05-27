
import React from "react";


function IssueTable({issue=[]}) {
    return(
         <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        {issues.map((issue) => (
          <tr key={issue.id}>
            <td>{issue.id}</td>
            <td>{issue.title}</td>
            <td>{issue.status}</td>
            <td>{issue.priority}</td>
          </tr>
        ))}
      </tbody>
    </table>
    )
};

export default IssueTable;

