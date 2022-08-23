import { useRef, useState } from 'react';
import keepAliveImpl from './keepAliveImpl';

const useKeepAlive = () => {
  const instance = useRef(false);
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
