import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { useListTodos } from '../../hooks'
import TodoItem from '../TodoItem'

const TodoList = () => {
  const { todos, isLoading, refetch } = useListTodos()
  return (
    <FlatList
      data={todos}
      onRefresh={refetch}
      renderItem={({item}) => (<TodoItem todo={item} />)}
      refreshing={isLoading}
      refreshControl={<RefreshControl refreshing={isLoading} />}
    />
  )
}

export default TodoList