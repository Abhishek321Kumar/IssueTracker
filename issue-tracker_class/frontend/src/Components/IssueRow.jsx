import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueRow extends React.Component {
  render() {
    const { issue } = this.props;
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{new Date(issue.created).toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? new Date(issue.due).toDateString() : ''}</td>
        <td>{issue.title}</td>
        <td><Link to={`/edit/${issue.id}`}>Edit</Link></td>
      </tr>
    );
  }
}