import React from "react";
import APIClient from "../client";

export type APIClientContextValue = {
  client: APIClient
  status: APIClientStatus
  isReady: boolean
  isInitializing: boolean
  isError: boolean
} | undefined

export interface APIClientContextProviderProps extends React.PropsWithChildren {
  baseUrl: string;
}

export type APIClientStatus = 'initializing' | 'ready' | 'error'
