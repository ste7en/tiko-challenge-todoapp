import React, {forwardRef} from 'react'
import ItemContainer from './ItemContainer'
import { Checkbox, Input } from 'tamagui'
import { Check as CheckIcon } from '@tamagui/lucide-icons'
import { TextInput } from 'react-native'

type RawTodoItemProps = {
  done?: boolean
  focused: boolean
  id?: string
  toggle?: () => void
  editDescription: string
  setEditDescription: (description: string) => void
  handleEdit: () => void
}

const RawTodoItem = forwardRef<TextInput, RawTodoItemProps>(({done = false, focused, id, toggle, editDescription, setEditDescription, handleEdit}, ref) => {
  return (
    <ItemContainer id={id}>
      <Checkbox id={id} size="$4" checked={done} onCheckedChange={toggle}>
        <Checkbox.Indicator>
          <CheckIcon />
        </Checkbox.Indicator>
      </Checkbox>
      <Input
        autoComplete='off'
        autoFocus={focused}
        borderWidth={0}
        enterKeyHint='done'
        onChangeText={setEditDescription}
        onSubmitEditing={handleEdit}
        ref={ref}
        size="$3"
        width={'100%'}
      >
        {editDescription}
      </Input>
    </ItemContainer>
  )
})

export default RawTodoItem