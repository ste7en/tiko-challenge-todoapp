import { SignUpForm } from '@tiko-challenge/authentication-login'
import { useRouter } from 'expo-router'
import React from 'react'

const SignUp = () => {
  const {navigate, back} = useRouter()
  return (
    <SignUpForm goBack={back} onSignUpSuccess={() => navigate('/sign-in')}/>
  )
}

export default SignUp