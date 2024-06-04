import React, { createContext } from 'react';
import APIClient from '../client';
import { useSession } from '@tiko-challenge/authentication-core';

const APIClientContext = createContext<APIClient | undefined>(undefined);

interface APIClientProviderProps extends React.PropsWithChildren {
  baseUrl: string;
}

const APIClientProvider: React.FC<APIClientProviderProps> = ({ baseUrl, children }) => {
  const {onSessionChange, onSessionExpire, session, onSessionVerified, isValidated} = useSession();
  const apiClient = APIClient.getInstance(baseUrl)

  React.useEffect(() => {
    if (isValidated) { return }
    if (session && session.accessToken && session.refreshToken) {
      const {accessToken, refreshToken} = session
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
      console.debug(`[ debug ] validating session ...`)
      apiClient.verifySession(accessToken)
        .then(() => {
          console.debug(`[ debug ] session verified`)
          apiClient.setAuthorization(accessToken)

          onSessionVerified()
        })
        .catch(() => {
          apiClient.setAuthorization(null)
          apiClient.setTokenRefresher(null)
          onSessionExpire()
        })
    }
  }, [session])

  return (
    <APIClientContext.Provider value={apiClient}>
      {children}
    </APIClientContext.Provider>
  );
};

export { APIClientProvider, APIClientContext };
