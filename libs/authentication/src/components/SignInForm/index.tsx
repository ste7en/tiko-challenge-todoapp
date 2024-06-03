import React, { useState } from 'react';
import {
  Button,
  Form,
  Heading,
  Input,
  YStack,
} from "tamagui";
import { Eye, EyeOff } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import useLogin from '../../hooks/useLogin';

interface SignInFormProps {
  onSignupRedirect: () => void;
  onLogin: (email: string, password: string) => void;
}

const SignInForm = ({onLogin, onSignupRedirect}: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useLogin()

  const handleLogin = () => {
    login(email, password)
  }

  const handleSignup = () => {
    onSignupRedirect()
  }

  const toggleShowPassword = () => {
    setShowPassword(state => !state)
  }

  return (
    <SafeAreaView>
      <Form onSubmit={handleLogin}>
        <YStack>
          <Heading>Login</Heading>
          <Input placeholder='Email' onChangeText={setEmail}/>
          <Input placeholder='Password' onChangeText={setPassword} />

          <YStack>
            <Form.Trigger asChild>
              <Button>
                Login
              </Button>
            </Form.Trigger>
            <Button onPress={handleSignup}>
              Sign up
            </Button>
          </YStack>
        </YStack>
      </Form>
    </SafeAreaView>
  )
}


export default SignInForm
