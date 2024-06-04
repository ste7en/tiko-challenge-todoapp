import React from 'react'
import { 
  Button,
  Form,
  Heading,
  Input,
  SizableText,
  Spinner,
  Text,
  YStack
} from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSignUp from '../../hooks/useSignUp'
import { User } from '@tiko-challenge/shared-api'

interface SignUpFormProps {
  onSignUpSuccess?: (args: User) => void
}

const SignUpForm = ({onSignUpSuccess}: SignUpFormProps = {}) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')

  const {signUp, isLoading, error} = useSignUp({onSignUpSuccess})

  const performSignup = async () => {
    signUp({email, password, confirmPassword, firstName, lastName})
  }

  return (
    <SafeAreaView>
      <Form onSubmit={performSignup}>
        <YStack>
          <Heading>Sign Up</Heading>
          <YStack>
            <YStack space="xs">
              <Text color="$text500">
                Name
              </Text>
              <Input textContentType='name' onChangeText={setFirstName} />
            </YStack>
            <YStack space="xs">
              <Text color="$text500">
                Surname
              </Text>
              <Input textContentType='familyName' onChangeText={setLastName} />
            </YStack>
            <YStack space="xs">
              <Text color="$text500">
                Email
              </Text>
              <Input textContentType='emailAddress' onChangeText={setEmail} autoCapitalize='none' />
            </YStack>
            <YStack space="xs">
              <Text color="$text500">
                Password
              </Text>
              <Input textContentType='newPassword' onChangeText={setPassword} />
            </YStack>
            <YStack space="xs">
              <Text color="$text500">
                Confirm Password
              </Text>
              <Input textContentType='newPassword' onChangeText={setConfirmPassword} />
            </YStack>
            {error && <SizableText color={'red'}>{error}</SizableText>}
          </YStack>
          <Form.Trigger asChild disabled={isLoading}>
            <Button icon={isLoading ? () => <Spinner /> : undefined}>
              Sign Up
            </Button>
          </Form.Trigger>
        </YStack>
      </Form>
    </SafeAreaView>
  )
}

export default SignUpForm