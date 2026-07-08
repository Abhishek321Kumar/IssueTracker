export default async function graphQLFetch(query, variables = {}) {
  try {
    const response = await fetch('http://localhost:3001/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    const body = await response.json();

    if (body.errors) {
      const errorMessage = body.errors.map(error => error.message).join('\n');
      console.error(errorMessage);
    }

    return body.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}