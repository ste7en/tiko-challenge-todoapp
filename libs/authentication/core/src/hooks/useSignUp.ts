import React from 'react'
import { User, useAPIClient } from '@tiko-challenge/shared-api'
import type { SignUpCredentials } from '../types/credentials'

type UseSignUp = {
  error: string | null
  isLoading: boolean
  signUp: (args: SignUpCredentials) => void
}
interface UseSignUpParams {
  onSignUpSuccess?: (args: User) => void
}

export default function useSignUp({onSignUpSuccess}: UseSignUpParams = {}): UseSignUp {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const client = useAPIClient()

  const signUp = React.useCallback(
    async ({firstName, lastName, confirmPassword, ...rest}: SignUpCredentials) => {
      if (isLoading) return
      setIsLoading(true)
      setError(null)
      try {
        const user = await client.register({...rest, first_name: firstName, last_name: lastName, password2: confirmPassword})
        onSignUpSuccess?.(user)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        }
      } finally {
        setIsLoading(false)
      }
    }, [client, isLoading, onSignUpSuccess])

  return {error, isLoading, signUp}
}
