import React from 'react'
import { APIClientContext } from '../components/APIClientProvider';
import { APIClientContextValue } from '../types';

type UseApiClientStatus = Omit<Exclude<APIClientContextValue, undefined>, 'client'>

export const useAPIClientStatus: () => UseApiClientStatus = () => {
  const context = React.useContext(APIClientContext);
  if (context === undefined) {
    throw new Error('useAPIClient must be used within a APIClientProvider');
  }
  const {client, ...rest} = context;
  return rest;
};
