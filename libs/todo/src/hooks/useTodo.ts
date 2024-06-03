import React from 'react'
import { Todo } from '@tiko-challenge/shared-types';
import useToggleTodoStatus from './useToggleDoneStatus';
import useEditTodoDescription from './useEditTodoDescription';

type UseTodo = Todo & {
  edit: (description: string) => void;
  delete: () => void;
  toggle: () => void;
}

export default function useTodo(todo: Todo): UseTodo {
  const [done, toggle] = useToggleTodoStatus(todo)
  const [description, edit] = useEditTodoDescription(todo)

  const { id } = todo

  const deleteTodo = React.useCallback(() => {
    console.debug(`Deleting todo ${id}`)
  }, [id])

  return { id, description, done, edit, delete: deleteTodo, toggle }
}
