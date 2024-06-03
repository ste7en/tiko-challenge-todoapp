import React from 'react'
import { APIClientContext } from '../components/APIClientProvider';

export const useAPIClient = () => {
  const context = React.useContext(APIClientContext);
  if (context === undefined) {
    throw new Error('useAPIClient must be used within a APIClientProvider');
  }
  return context;
};
