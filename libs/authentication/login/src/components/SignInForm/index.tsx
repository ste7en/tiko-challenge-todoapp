import React, { useState } from 'react';
import {
  Button,
  Form,
  H1,
  Input,
  Separator,
  SizableText,
  Spacer,
  Spinner,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import { Eye, EyeOff, PencilLine } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import {useLogin} from '../../hooks';
import { StyleSheet } from 'react-native';

interface SignInFormProps {
  onSignupRedirect: () => void;
}

const SignInForm = ({onSignupRedirect}: SignInFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const passwordInputRef = React.useRef<Input>(null)
  const {login, error, isLoading} = useLogin()

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
    <View flex={1} backgroundColor="$background">
      <SafeAreaView style={StyleSheet.absoluteFillObject}>
        <YStack alignSelf='center' flex={1} gap="$10" width={'85%'}>
          <Spacer />
          <YStack gap="$1" alignItems='center'>
            <XStack alignItems='flex-end' gap="$3">
              <PencilLine size={"$3"} />
              <H1>tasked</H1>
            </XStack>
            <SizableText>Organize your tasks, achieve more.</SizableText>
          </YStack>
          <YStack>
            <Form onSubmit={handleLogin} gap="$5">
              <YStack gap="$3">
                <Input
                  autoCapitalize='none'
                  placeholder='Email'
                  onChangeText={setEmail}
                  returnKeyType='next'
                  keyboardType='email-address'
                  textContentType='emailAddress'
                  onSubmitEditing={() => { passwordInputRef.current?.focus() }}
                />
                <XStack gap="$2">
                  <Input
                    autoCapitalize='none'
                    placeholder='Password'
                    onChangeText={setPassword}
                    ref={passwordInputRef}
                    returnKeyLabel='Log In'
                    secureTextEntry={!showPassword}
                    textContentType='password'
                    enablesReturnKeyAutomatically
                    flex={1}
                  />
                  <Button width={'10%'} onPress={toggleShowPassword}>
                    {showPassword ? <EyeOff strokeWidth={1} /> : <Eye strokeWidth={1} />}
                  </Button>
                </XStack>
              </YStack>
              {error && <SizableText color='red'>{error}</SizableText>}
              <Form.Trigger asChild>
                <Button
                  disabled={!email || !password || isLoading}
                  icon={isLoading ? () => <Spinner /> : undefined}
                >
                  Log In
                </Button>
              </Form.Trigger>
            </Form>

            <Spacer />

            <XStack gap="$2" alignItems='center'>
              <Separator/>
              <Text>OR</Text>
              <Separator/>
            </XStack>

            <Spacer />

            <Button onPress={handleSignup} variant='outlined'>
              Sign Up
            </Button>
          </YStack>
        </YStack>
      </SafeAreaView>
    </View>
  )
}


export default SignInForm
