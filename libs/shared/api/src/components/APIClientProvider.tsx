import React, { createContext } from 'react';
import APIClient from '../client';
import { useSession } from '@tiko-challenge/authentication-core';
import type { APIClientContextProviderProps, APIClientContextValue, APIClientStatus } from '../types';

const APIClientContext = createContext<APIClientContextValue>(undefined);

const APIClientProvider: React.FC<APIClientContextProviderProps> = ({ baseUrl, children }) => {
  const [status, setStatus] = React.useState<APIClientStatus>('initializing')
  const {onSessionChange, onSessionExpire, session} = useSession()
  const apiClient = APIClient.getInstance(baseUrl)

  React.useEffect(() => {
    if (session && session.accessToken && session.refreshToken) {
      const {accessToken, refreshToken} = session
      
      console.debug(`[ debug ] validating session ...`)
      
      apiClient.verifySession(accessToken)
        .then(() => {
          console.debug(`[ debug ] session verified`)
          apiClient.setAuthorization(accessToken)

          apiClient.setTokenRefresher(async () => {
            try {
              const newSession = await apiClient.refreshToken(refreshToken);
              onSessionChange({
                accessToken: newSession.access,
                refreshToken: newSession.refresh,
              });
              apiClient.setAuthorization(newSession.access);
            } catch (e) {
              onSessionExpire()
            }
          })
          setStatus('ready')
        })
        .catch(() => {
          apiClient.setAuthorization(null)
          apiClient.setTokenRefresher(null)
          onSessionExpire()
          setStatus('error')
        })
    } else {
      apiClient.setAuthorization(null)
      apiClient.setTokenRefresher(null)
    }

    return () => {
      apiClient.setAuthorization(null)
      apiClient.setTokenRefresher(null)
    }
  }, [session])

  const contextValue: APIClientContextValue = {
    client: apiClient,
    status,
    isReady: status === 'ready',
    isInitializing: status === 'initializing',
    isError: status === 'error',
  }

  return (
    <APIClientContext.Provider value={contextValue}>
      {children}
    </APIClientContext.Provider>
  );
};

export { APIClientProvider, APIClientContext };
