import React, { useRef, useEffect, useContext, useLayoutEffect } from 'react';
import { ActionsStatus, KeepContext } from './constants';
import { renderWithChildren } from './utils';

const KeepAliveItem = ({ cacheId, children, style }) => {
  const parentRef = useRef(null);
  const firstRender = useRef(false);

  const { cacheHandle, hasCacheNode } = useContext(KeepContext);

  const loader = (children) => {
    parentRef.current.appendChild(children);
  };

  if (!firstRender.current && !hasCacheNode(cacheId)) {
    cacheHandle(ActionsStatus.CREATE, {
      cacheId,
      children: renderWithChildren(children),
      loader,
    });
  }

  useLayoutEffect(() => {
    if (!firstRender.current) return;
    cacheHandle(ActionsStatus.UPDATE, {
      cacheId,
      children: renderWithChildren(children),
    });
  }, [children]);

  useEffect(() => {
    firstRender.current = true;
    cacheHandle(ActionsStatus.ACTIVE, {
      loader,
      cacheId,
    });
    return () => {
      cacheHandle(ActionsStatus.INACTIVE, { cacheId });
    };
  }, []);

  return <div ref={parentRef} style={style} />;
};

export default KeepAliveItem;
