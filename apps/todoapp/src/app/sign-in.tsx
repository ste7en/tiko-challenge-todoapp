import React from 'react'
import { useRouter } from 'expo-router'
import { SignInForm } from '@tiko-challenge/authentication-login'

const SignIn = () => {
  const {navigate} = useRouter()
  const onSignupRedirect = () => {
    navigate('/sign-up')
  }

  return (
    <SignInForm onSignupRedirect={onSignupRedirect} />
  )
}

export default SignIn