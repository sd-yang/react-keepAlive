import { useRef, useState } from 'react';
import keepAliveImpl from './KeepAliveImpl';

const useKeepAlive = () => {
  const instance = useRef(null);
  const [, setUpdate] = useState();
  if (!instance.current) {
    instance.current = new keepAliveImpl(setUpdate);
  }

  return {
    cacheStore: instance.current.cacheStore,
    cacheHandle: instance.current.cacheHandle,
    hasCacheNode: instance.current.hasCacheNode
  }
};

export default useKeepAlive;
