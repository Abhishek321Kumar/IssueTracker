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
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date().toISOString(),
    due: null,
    title: 'Missing bottom border on panel',
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
  }

  input IssueInputs {
    status: String!
    owner: String!
    effort: Int
    title: String!
  }

  type Query {
    issueList: [Issue!]!
  }

  type Mutation {
    issueAdd(issue: IssueInputs!): Issue!
  }
`);

const root = {
  issueList: () => issues,

  issueAdd: ({ issue }) => {
    const newIssue = {
      id: issues.length + 1,
      status: issue.status,
      owner: issue.owner,
      effort: issue.effort,
      title: issue.title,
      created: new Date().toISOString(),
      due: null,
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