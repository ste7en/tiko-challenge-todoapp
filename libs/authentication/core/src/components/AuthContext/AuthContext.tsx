
import React, { useMemo } from 'react';
import { useStorageState } from '@tiko-challenge/shared-configs';
import { AuthenticationState } from '../../types/AuthenticationState';
import {router} from 'expo-router';

type SessionProviderValue = {
  session: AuthenticationState;
  isLoading: boolean;
  onSessionChange: (session: AuthenticationState) => void;
  onSessionExpire: () => void;
  signOut: () => void;
}

export const AuthContext = React.createContext<SessionProviderValue>({
  signOut: () => null,
  session: null,
  isLoading: false,
  onSessionChange: () => null,
  onSessionExpire: () => null,
})

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, sessionJSON], setSession] = useStorageState('session');
  const session: AuthenticationState = useMemo(() => sessionJSON ? JSON.parse(sessionJSON) : null, [sessionJSON]);

  const onSessionExpire = () => {
    setSession(null);
    console.debug(`[ debug ] session expired`)
  }

  const onSessionChange = (newSession: AuthenticationState) => {
    setSession(JSON.stringify(newSession));
    router.replace('/');
  }

  return (
    <AuthContext.Provider
      value={{
        onSessionChange,
        signOut: onSessionExpire,
        onSessionExpire,
        session,
        isLoading,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}