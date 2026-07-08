import React from 'react';

export default class IssueAdd extends React.Component {
  constructor() {
    super();
    this.state = { owner: '', title: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChangeOwner = this.onChangeOwner.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { owner, title } = this.state;
    const { createIssue } = this.props;

    const newIssue = { status: 'New', owner, effort: 5, title };
    createIssue(newIssue);

    this.setState({ owner: '', title: '' });
  }

  onChangeOwner(e) {
    this.setState({ owner: e.target.value });
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  render() {
    const { owner, title } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={this.onChangeOwner}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={this.onChangeTitle}
          required
        />
        <button type="submit">Add Issue</button>
      </form>
    );
  }
}