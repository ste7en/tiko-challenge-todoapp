import React from 'react'
import { Todo } from '@tiko-challenge/shared-types'
import { useTodo } from '../../hooks'
import RawTodoItem from './RawTodoItem'

interface TodoItemProps {
  todo: Todo,
  focused?: boolean
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, focused = false }) => {
  const {toggle, done, description, edit} = useTodo(todo)
  const [editDescription, setEditDescription] = React.useState(description)
  const id = `todo-${todo.id}`

  const handleEdit = () => edit(editDescription)

  return (
    <RawTodoItem
      done={done}
      focused={focused}
      id={id}
      editDescription={editDescription}
      setEditDescription={setEditDescription}
      toggle={toggle}
      handleEdit={handleEdit}
    />
  )
}

export default TodoItem