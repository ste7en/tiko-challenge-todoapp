import React from 'react'
import { useAPIClient } from '@tiko-challenge/shared-api'

export default function useAddTodo(onSuccess?: () => void, onError?: (error: Error) => void) {
  const client = useAPIClient()

  const addTodo = React.useCallback(async (description: string) => {
    if (!description) {
      return
    }
    try {
      await client.createTodo({
        description,
      })
      onSuccess?.()
    } catch (error) {
      console.error(error)
      onError?.(error as Error)
    }
  }, [])

  return addTodo
}
