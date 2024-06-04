
import React from 'react';
import { useStorageState } from '@tiko-challenge/shared-configs';
import { AuthenticationState } from '../../types/AuthenticationState';
import {router} from 'expo-router';

type SessionProviderValue = {
  session: AuthenticationState;
  isLoading: boolean;
  isValidated: boolean;
  onSessionChange: (session: AuthenticationState) => void;
  onSessionExpire: () => void;
  onSessionVerified: () => void;
  signOut: () => void;
}

export const AuthContext = React.createContext<SessionProviderValue>({
  signOut: () => null,
  session: null,
  isLoading: false,
  isValidated: false,
  onSessionChange: () => null,
  onSessionExpire: () => null,
  onSessionVerified: () => null,
})

export function SessionProvider(props: React.PropsWithChildren) {
  const [isValidated, setIsValidated] = React.useState(false);
  const [[isLoading, sessionJSON], setSession] = useStorageState('session');
  const session: AuthenticationState = sessionJSON ? JSON.parse(sessionJSON) : null;

  const onSessionExpire = () => {
    setSession(null);
    setIsValidated(false);
    console.debug(`[ debug ] session expired`)
  }

  const onSessionChange = (newSession: AuthenticationState) => {
    setSession(JSON.stringify(newSession));
    setIsValidated(true);
    router.replace('/');
  }

  const onSessionVerified = () => {
    setIsValidated(true);
  }
  
  return (
    <AuthContext.Provider
      value={{
        onSessionChange,
        signOut: onSessionExpire,
        onSessionExpire,
        onSessionVerified,
        session,
        isLoading,
        isValidated,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}