import React from 'react'
import { Todo } from '@tiko-challenge/shared-types'
import { useAPIClient } from '@tiko-challenge/shared-api'
import { useStorageState } from '@tiko-challenge/shared-configs'

type UseListTodos = {
  todos: Todo[]
  refetch: () => void
  setTodos: (todos: Todo[]) => void
  isLoading: boolean
}

export default function useListTodos(): UseListTodos {
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  
  const [[, cache], updateCache] = useStorageState('cached-todos')
  const client = useAPIClient()
  
  const refetch = () => {
    setIsLoading(true)
    if (cache) {
      setTodos(JSON.parse(cache))
    }
    client.listTodos()
      .then(data => {
        setTodos(data)
        updateCache(JSON.stringify(data))
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
    }
  
  React.useEffect(refetch, [])
  
  return { todos, isLoading, refetch, setTodos }
}
