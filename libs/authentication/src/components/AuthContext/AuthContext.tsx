
import React from 'react';
import { useStorageState } from '@tiko-challenge/shared-configs';
import { AuthenticationState } from '../../types/AuthenticationState';

export const AuthContext = React.createContext<{
  signIn: (session: AuthenticationState) => void;
  signOut: () => void;
  session: AuthenticationState;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
})

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, sessionJSON], setSession] = useStorageState('session');
  const session: AuthenticationState = sessionJSON ? JSON.parse(sessionJSON) : null;

  return (
    <AuthContext.Provider
      value={{
        signIn: (newSession) => {
          // Perform sign-in logic here
          setSession(JSON.stringify(newSession));
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