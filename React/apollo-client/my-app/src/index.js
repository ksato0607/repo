import React from 'react';
import { render } from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Dog } from './components/Dog';
import { Todo } from './components/Todo';

const client = new ApolloClient({
  uri: 'https://71z1g.sse.codesandbox.io/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <dir>
        <Dog />
        <Todo />
      </dir>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));
