import React from 'react';
import { ADD_TODO } from '../graphql/ADD_TODO';
import { GET_TODOS } from '../graphql/GET_TODOS';
import { UPDATE_TODO } from '../graphql/UPDATE_TODO';
import { useMutation, useQuery } from '@apollo/client';

function AddTodo() {
  let input;
  const [addTodo, { data }] = useMutation(ADD_TODO);
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = '';
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

function TodoList() {
  const { loading: queryLoading, error: queryError, data } = useQuery(
    GET_TODOS
  );
  const [
    updateTodo,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(UPDATE_TODO);

  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error :(</p>;

  return data.todos.map(({ id, type }) => {
    let input;

    return (
      <div key={id}>
        <p>{type}</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTodo({ variables: { id, type: input.value } });
            input.value = '';
          }}
        >
          <input
            ref={(node) => {
              input = node;
            }}
          />
          <button type="submit">Update Todo</button>
        </form>
      </div>
    );
  });
}

export function Todo() {
  return (
    <div>
      <TodoList />
      <br />
      <AddTodo />
    </div>
  );
}
