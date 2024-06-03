import React from 'react'
import { useAPIClient } from '@tiko-challenge/shared-api';
import { Todo } from '@tiko-challenge/shared-types';

type UseEditTodoDescription = [
  description: string,
  editDescription: (newDescription: string) => void
]

export default function useEditTodoDescription({ id, description, ...rest }: Todo): UseEditTodoDescription {
  const [todoDescription, setTodoDescription] = React.useState(description);
  const client = useAPIClient()

  const editDescription = React.useCallback(async (newDescription: string) => {
    try {
      await client.updateTodo(id, { ...rest, description: newDescription })
      setTodoDescription(newDescription)
    } catch (error) {
      console.error(error)
    }
  }, [id])

  return [todoDescription, editDescription]
}
