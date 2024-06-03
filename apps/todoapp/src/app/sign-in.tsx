import React from 'react'
import {router} from 'expo-router'
import { SignInForm } from '@tiko-challenge/authentication'

const SignIn = () => {
  const onSignupRedirect = () => {
    router.navigate('/sign-up')
  }
  const onLogin = (email: string, password: string) => {
    // Call the authentication API
  }

  return (
    <SignInForm onLogin={onLogin} onSignupRedirect={onSignupRedirect}/>
  )
}

export default SignIn