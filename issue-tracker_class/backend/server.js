const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const app = express();

app.use(cors());

let issues = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date().toISOString(),
    due: null,
    title: 'Error in console when clicking Add',
    description: '',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date().toISOString(),
    due: null,
    title: 'Missing bottom border on panel',
    description: '',
  },
];

const schema = buildSchema(`
  type Issue {
    id: Int!
    status: String!
    owner: String!
    effort: Int
    created: String!
    due: String
    title: String!
    description: String
  }

  input IssueInputs {
    status: String!
    owner: String!
    effort: Int
    title: String!
  }

  type Query {
    issueList(status: String, effortMin: Int, effortMax: Int): [Issue!]!
    issue(id: Int!): Issue
  }

  type Mutation {
    issueAdd(issue: IssueInputs!): Issue!
  }
`);

const root = {
  issueList: ({ status, effortMin, effortMax }) => {
    let filtered = issues;

    if (status) {
      filtered = filtered.filter(issue => issue.status === status);
    }
    if (effortMin != null) {
      filtered = filtered.filter(issue => issue.effort >= effortMin);
    }
    if (effortMax != null) {
      filtered = filtered.filter(issue => issue.effort <= effortMax);
    }

    return filtered;
  },

  issue: ({ id }) => issues.find(issue => issue.id === id),

  issueAdd: ({ issue }) => {
    const newIssue = {
      id: issues.length + 1,
      status: issue.status,
      owner: issue.owner,
      effort: issue.effort,
      title: issue.title,
      created: new Date().toISOString(),
      due: null,
      description: '',
    };

    issues.push(newIssue);
    return newIssue;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3001, () => {
  console.log('API server started on port 3001');
});