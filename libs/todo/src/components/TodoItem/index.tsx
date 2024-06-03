import React from 'react'
import { Checkbox, Input, ListItem, XStack } from 'tamagui'
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { Todo } from '@tiko-challenge/shared-types'
import { useTodo } from '../../hooks'

interface TodoItemProps {
  todo: Todo
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const {toggle, done, description, edit} = useTodo(todo)
  const [editDescription, setEditDescription] = React.useState(description)
  const id = `todo-${todo.id}`

  const handleEdit = () => edit(editDescription)

  return (
    <ListItem key={id} pressTheme>
      <XStack alignItems='center' gap="$3">
        <Checkbox size="$4" id={id} checked={done} onCheckedChange={toggle}>
          <Checkbox.Indicator>
            <CheckIcon />
          </Checkbox.Indicator>
        </Checkbox>
        <Input
          autoComplete='off'
          borderWidth={0}
          enterKeyHint='done'
          onBlur={handleEdit}
          onChangeText={setEditDescription}
          onSubmitEditing={handleEdit}
          size="$3"
          width={'100%'}
        >
          {editDescription}
        </Input>
      </XStack>
    </ListItem>
  )
}

export default TodoItem