import React from 'react'
import { useRouter } from 'expo-router'
import { SignInForm } from '@tiko-challenge/authentication-login'

const SignIn = () => {
  const {navigate} = useRouter()
  const onSignupRedirect = () => {
    navigate('/sign-up')
  }
  const onLogin = (email: string, password: string) => {
    // Call the authentication API
  }

  return (
    <SignInForm onLogin={onLogin} onSignupRedirect={onSignupRedirect} />
  )
}

export default SignIn