import React from 'react'
import { useAPIClient } from '@tiko-challenge/shared-api';
import { Todo } from '@tiko-challenge/shared-types';

type UseToggleTodoStatus = [
  isDone: boolean,
  toggle: () => void
]

export default function useToggleTodoStatus({id, done, ...rest}: Todo): UseToggleTodoStatus {
  const [isDone, setIsDone] = React.useState(done);
  const client = useAPIClient()

  const toggle = React.useCallback(async () => {
    try {
      await client.updateTodo(id, { ...rest, done: !isDone })
      setIsDone(done => !done)
    } catch (error) {
      console.error(error)
    }
  }, [id])
  return [isDone, toggle]
}
