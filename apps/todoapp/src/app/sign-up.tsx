import { SignUpForm } from '@tiko-challenge/authentication'
import { useRouter } from 'expo-router'
import React from 'react'

const SignUp = () => {
  const {navigate} = useRouter()
  return (
    <SignUpForm onSignUpSuccess={() => navigate('/sign-in')}/>
  )
}

export default SignUp