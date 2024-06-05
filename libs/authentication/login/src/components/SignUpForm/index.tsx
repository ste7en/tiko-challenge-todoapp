import React from 'react'
import { 
  Button,
  ButtonIcon,
  Form,
  H1,
  H2,
  Heading,
  Input,
  Label,
  Paragraph,
  ScrollView,
  SizableText,
  Spacer,
  Spinner,
  Text,
  View,
  YStack
} from 'tamagui'
import { ArrowLeftCircle } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import useSignUp from '../../../../login/src/hooks/useSignUp'
import { User } from '@tiko-challenge/shared-api'
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity } from 'react-native'

const BackButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ButtonIcon scaleIcon={2}>
        <ArrowLeftCircle />
      </ButtonIcon>
    </TouchableOpacity>
  )
}

interface SignUpFormProps {
  goBack(): void
  onSignUpSuccess: (args: User) => void
}

const SignUpForm = ({goBack, onSignUpSuccess}: SignUpFormProps) => {
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
    <KeyboardAvoidingView behavior='padding' style={StyleSheet.absoluteFill}>
      <View flex={1} backgroundColor="$background">
        <SafeAreaView style={StyleSheet.absoluteFillObject}>
          <View paddingLeft="$4" paddingVertical="$3">
            <BackButton onPress={goBack} />
          </View>
          <YStack alignSelf='center' flex={1} gap="$3" width={"85%"}>
            <YStack gap="$1">
              <Heading>Create your tasked account</Heading>
              <Paragraph>Stay organized and achieve more every day.</Paragraph>
            </YStack>
            <Form flex={1} onSubmit={performSignup}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <YStack gap="$1">
                    <YStack>
                      <Label htmlFor='first-name'>Name</Label>
                      <Input
                        id='first-name'
                        textContentType='name'
                        onChangeText={setFirstName}
                      />
                    </YStack>
                    <YStack>
                      <Label htmlFor='last-name'>Surname</Label>
                      <Input
                        id='last-name'
                        textContentType='familyName'
                        onChangeText={setLastName}
                      />
                    </YStack>
                    <YStack>
                      <Label htmlFor='email'>Email</Label>
                      <Input
                        id='email'
                        textContentType='emailAddress'
                        onChangeText={setEmail}
                        autoCapitalize='none'
                      />
                    </YStack>
                    <YStack>
                      <Label htmlFor='password'>Password</Label>
                      <Input id='password' textContentType='newPassword' onChangeText={setPassword} />
                    </YStack>
                    <YStack>
                      <Label htmlFor='confirm-password'>Confirm Password</Label>
                      <Input
                        id='confirm-password'
                        textContentType='newPassword'
                        onChangeText={setConfirmPassword}
                      />
                    </YStack>
                    {error && <SizableText color={'red'}>{error}</SizableText>}
                  </YStack>
                </ScrollView>
              <YStack gap="$4">
                <Form.Trigger marginTop={"$2"} asChild disabled={isLoading}>
                  <Button
                    disabled={!email || !password || !confirmPassword || !firstName || !lastName || isLoading}
                    icon={isLoading ? () => <Spinner /> : undefined}
                  >
                    Sign Up
                  </Button>
                </Form.Trigger>
                <TouchableOpacity activeOpacity={0.5} onPress={goBack}>
                  <Text color={"$blue11"} textAlign='center'>
                    Already have an account? Log In
                  </Text>
                </TouchableOpacity>
              </YStack>
            </Form>
          </YStack>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default SignUpForm