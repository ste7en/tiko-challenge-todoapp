import React from 'react'
import { useAPIClient } from '@tiko-challenge/shared-api'
import { useSession } from './useSession'

type UseLogin = {
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
}
// move to a new package -- login
export default function useLogin(): UseLogin {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const client = useAPIClient()
  const {onSessionChange} = useSession()

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      console.log({email, password})
      const data = await client.login({email, password})
      onSessionChange({
        accessToken: data.access,
        refreshToken: data.refresh,
      })
      console.log('Logged in', data)
    } catch (e) {
      console.log('Error logging in', e)
      if (e instanceof Error) {
        setError(e.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    error,
    login,
  }
}