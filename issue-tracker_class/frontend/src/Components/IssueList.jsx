import React from 'react';
import { withRouter } from 'react-router-dom';
import IssueFilter from './IssueFilter';
import IssueTable from './IssueTable';
import IssueAdd from './IssueAdd';
import graphQLFetch from '../graphQLFetch';

class IssueList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };
    this.createIssue = this.createIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const { location: { search: prevSearch } } = prevProps;
    const { location: { search } } = this.props;
    if (prevSearch !== search) {
      this.loadData();
    }
  }

  async loadData() {
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    const vars = {};

    if (params.get('status')) vars.status = params.get('status');

    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;

    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

    const query = `
      query issueList($status: String, $effortMin: Int, $effortMax: Int) {
        issueList(status: $status, effortMin: $effortMin, effortMax: $effortMax) {
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

    const data = await graphQLFetch(query, vars);
    if (data) {
      this.setState({ issues: data.issueList });
    }
  }

  async createIssue(issue) {
    const query = `
      mutation ($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
          id
        }
      }
    `;
    await graphQLFetch(query, { issue });
    this.loadData();
  }

  render() {
    const { issues } = this.state;
    return (
      <>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <IssueTable issues={issues} />
        <IssueAdd createIssue={this.createIssue} />
      </>
    );
  }
}

export default withRouter(IssueList);