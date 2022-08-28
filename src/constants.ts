import { createContext } from 'react';

export const KeepContext = createContext({});

export enum ActionsStatus {
  CREATE = 'create',
  UPDATE = 'update',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DESTROY = 'destroy',
}