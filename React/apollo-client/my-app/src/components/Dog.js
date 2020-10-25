import React from 'react';
import { useState } from 'react';
import { GET_DOGS } from '../graphql/GET_DOGS';
import { GET_DOG_PHOTO } from '../graphql/GET_DOG_PHOTO';
import { useQuery, NetworkStatus } from '@apollo/client';

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

export function Dog() {
  const [selectedDog, setSelectedDog] = useState(null);

  function onDogSelected({ target }) {
    setSelectedDog(target.value);
  }

  return (
    <div>
      <Dogs onDogSelected={onDogSelected} />
      {selectedDog && <DogPhoto breed={selectedDog} />}
    </div>
  );
}
