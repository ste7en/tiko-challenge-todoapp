
import React from 'react';
import { useStorageState } from '@tiko-challenge/shared-configs';
import { AuthenticationState } from '../../types/AuthenticationState';
import { SignUpCredentials } from '../../types/credentials';
import { useAPIClient } from '@tiko-challenge/shared-api';
import {router} from 'expo-router';

export const AuthContext = React.createContext<{
  signIn: (session: AuthenticationState) => void;
  signUp: (credentials: SignUpCredentials) => void;
  signOut: () => void;
  session: AuthenticationState;
  isLoading: boolean;
}>({
  signIn: () => null,
  signUp: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, sessionJSON], setSession] = useStorageState('session');
  const {setAuthorization} = useAPIClient();
  const session: AuthenticationState = sessionJSON ? JSON.parse(sessionJSON) : null;

  return (
    <AuthContext.Provider
      value={{
        signIn: (newSession) => {
          setSession(JSON.stringify(newSession));
          setAuthorization(newSession?.accessToken || null);
          router.replace('/');
        },
        signUp: (credentials) => {
          // Perform sign-up logic here
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}