import { Redirect, Stack } from 'expo-router';

import { useSession } from '@tiko-challenge/authentication-core';
import { Spinner, YStack } from 'tamagui';

export default function AppLayout() {
  const { session, isLoading, isValidated } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading || (session && !isValidated)) {
    return (
      <YStack flex={1} alignItems='center' justifyContent='center'>
        <Spinner size='large' color='$orange10' />
      </YStack>
    );
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}
