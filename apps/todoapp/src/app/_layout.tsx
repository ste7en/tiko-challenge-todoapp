import '../../tamagui-web.css'

import React from 'react';
import { useColorScheme } from 'react-native';
import { SplashScreen, Slot } from 'expo-router';
import { useFonts } from 'expo-font';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TamaguiProvider } from 'tamagui';
import { SessionProvider } from '@tiko-challenge/authentication-core';
import tamaguiConfig from '../../tamagui.config';
import { APIClientProvider } from '@tiko-challenge/shared-api';
import {ToastProvider} from '@tamagui/toast'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })
  
  React.useEffect(() => {
    if (loaded) {
      // can hide splash screen here
      SplashScreen.hideAsync();
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <TamaguiProvider config={tamaguiConfig}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <SessionProvider>
            <APIClientProvider baseUrl={process.env.EXPO_PUBLIC_API_URL ?? 'localhost:3000'}>
              <SafeAreaProvider>
                <ToastProvider>
                  <Slot />
                </ToastProvider>
              </SafeAreaProvider>
            </APIClientProvider>
          </SessionProvider>
        </ThemeProvider>
      </TamaguiProvider>
    </GestureHandlerRootView>
  );
}