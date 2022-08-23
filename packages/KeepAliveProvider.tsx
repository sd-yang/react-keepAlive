import React from 'react';
import { KeepContext } from './constants';
import useKeepAlive from './useKeepAlive';
import KeepAliveScope from './KeepAliveScope';

const KeepAliveProvider = ({ children }) => {
  const { cacheStore, cacheHandle, hasCacheNode } = useKeepAlive();

  const providerValues = {
    cacheStore,
    cacheHandle,
    hasCacheNode,
  };

  return (
    <KeepContext.provider value={providerValues}>
      {children}
      {cacheStore.map((item) => (
        <KeepAliveScope key={item.cacheId} {...item} />
      ))}
    </KeepContext.provider>
  );
};

export default KeepAliveProvider;
