import React from 'react'
import { Todo } from '@tiko-challenge/shared-types'
import { useAPIClient } from '@tiko-challenge/shared-api'
import { useStorageState } from '@tiko-challenge/shared-configs'

type UseListTodos = {
  todos: Todo[]
  refetch: () => Promise<void>
  setTodos: (todos: Todo[]) => void
  isLoading: boolean
  deleteTodo: (id: number) => void
}

export default function useListTodos(): UseListTodos {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  
  const [[, cache], updateCache] = useStorageState('cached-todos')
  const client = useAPIClient()
  
  const refetch = async () => {
    setIsLoading(true)
    if (cache && !todos.length) {
      setTodos(JSON.parse(cache))
    }
    return client.listTodos()
      .then(data => {
        setTodos(data)
        updateCache(JSON.stringify(data))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
    }
  
  React.useEffect(() => { refetch() }, [])

  //TODO: refactor in a separate hook
  const deleteTodo = (id: number) => {
    if (!todos.find(todo => todo.id === id)) {
      console.error(`Todo with id ${id} to delete not found!`)
      return
    }
    const updatedTodos = todos.filter(todo => todo.id !== id)
    setTodos(updatedTodos)
    
    client.deleteTodo(id)
      .then(() => updateCache(JSON.stringify(updatedTodos)))
      .catch(() => { setTodos(todos) })
      .finally(refetch)
  }
  
  return {
    todos,
    isLoading,
    refetch,
    setTodos,
    deleteTodo
  }
}
