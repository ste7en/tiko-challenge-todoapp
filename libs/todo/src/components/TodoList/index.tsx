import React from 'react'
import { RefreshControl, TextInput } from 'react-native'
import { useListTodos } from '../../hooks'
import TodoItem from '../TodoItem'
import { ScrollView, Text } from 'tamagui'
import ItemContainer from '../TodoItem/ItemContainer'
import {Plus} from '@tamagui/lucide-icons'
import {useToastController} from '@tamagui/toast'
import RawTodoItem from '../TodoItem/RawTodoItem'
import useAddTodo from '../../hooks/useAddTodo'

const TodoList = () => {
  const { todos, isLoading, refetch, setTodos } = useListTodos()
  const [edit, setEdit] = React.useState('')
  const inputRef = React.useRef<TextInput>(null)
  const {show} = useToastController()

  const onTodoAdded = () => {
    setEdit('')
    refetch()
  }

  const onTodoAddError = () => {
    //FIXME: toast does not work
    console.log('An error occurred while adding a new todo')
    show('An error occurred while adding a new todo', {
      duration: 1000,
    })
  }

  const addNewTodo = useAddTodo(onTodoAdded, onTodoAddError)

  const addTodo = () => {
    const lastTodo = todos[todos.length - 1];

    if (lastTodo.description !== '') {
      setTodos([
        ...todos,
        {
          id: -1,
          description: '',
          done: false,
        },
      ]);
    } else {
      inputRef.current?.focus();
    }
  }

  return (
    <ScrollView
      refreshControl={<RefreshControl onRefresh={refetch} refreshing={isLoading} />}
    >
      {todos.map(todo => {
        if (todo.id !== -1) return <TodoItem key={todo.id} todo={todo} />
        else {
          return (
            <RawTodoItem
              focused
              ref={inputRef}
              editDescription={edit}
              setEditDescription={setEdit}
              handleEdit={() => addNewTodo(edit)}
            />
          )
        }
      })}
      <ItemContainer flex={1} onPress={addTodo}>
        <>
          <Plus size={'24px'} color={'grey'} />
          <Text color={'grey'}>Add a new task</Text>
        </>
      </ItemContainer>
    </ScrollView>
  )
}

export default TodoList