import React from 'react';
import { render } from 'react-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  NetworkStatus,
} from '@apollo/client';
import { GET_DOGS } from './graphql/GET_DOGS';
import { GET_DOG_PHOTO } from './graphql/GET_DOG_PHOTO';
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'https://71z1g.sse.codesandbox.io/',
  cache: new InMemoryCache(),
});

function Dogs({ onDogSelected }) {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="dog" onChange={onDogSelected}>
      {data.dogs.map((dog) => (
        <option key={dog.id} value={dog.breed}>
          {dog.breed}
        </option>
      ))}
    </select>
  );
}

function DogPhoto({ breed }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(
    GET_DOG_PHOTO,
    {
      variables: { breed },
      notifyOnNetworkStatusChange: true,
    }
  );

  if (networkStatus === NetworkStatus.refetch) return 'Refetching!';
  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <div>
      <img
        src={data.dog.displayImage}
        alt={breed}
        style={{ height: 100, width: 100 }}
      />
      <button onClick={() => refetch()}>Refetch!</button>
    </div>
  );
}

function App() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({ target }) {
    setSelectedDog(target.value);
  }

  return (
    <ApolloProvider client={client}>
      <dir>
        <Dogs onDogSelected={onDogSelected} />
        {selectedDog && <DogPhoto breed={selectedDog} />}
      </dir>
    </ApolloProvider>
  );
}

render(<App />, document.getElementById('root'));
