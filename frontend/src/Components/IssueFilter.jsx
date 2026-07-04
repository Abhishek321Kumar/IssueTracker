import React from 'react';

function IssueFilter() {
  return (
    <form>
      Status:
      {' '}
      <select>
        <option value="">(All)</option>
        <option value="New">New</option>
        <option value="Assigned">Assigned</option>
        <option value="Fixed">Fixed</option>
        <option value="Closed">Closed</option>
      </select>
      {' | '}
      Effort between:
      {' '}
      <input type="number" size={5} placeholder="Min" />
      {' - '}
      <input type="number" size={5} placeholder="Max" />
      {' '}
      <button type="button">Apply</button>
      {' '}
      <button type="button">Reset</button>
    </form>
  );
}

export default IssueFilter;
