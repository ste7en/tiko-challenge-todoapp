import React, { createContext } from 'react';
import APIClient from '../client';

const APIClientContext = createContext<APIClient | undefined>(undefined);

interface APIClientProviderProps extends React.PropsWithChildren {
  baseUrl: string;
}

const APIClientProvider: React.FC<APIClientProviderProps> = ({ baseUrl, children }) => {
  const apiClient = React.useMemo(() => APIClient.getInstance(baseUrl), [baseUrl]);
  
  return (
    <APIClientContext.Provider value={apiClient}>
      {children}
    </APIClientContext.Provider>
  );
};

export { APIClientProvider, APIClientContext };
