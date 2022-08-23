import React, { useRef, useEffect, useContext } from 'react';
import ReactDom from 'react-dom';
import { KeepContext } from './constants';
import { ActionsStatus } from './constants';

const KeepAliveScope = ({ cacheId, status, loader, children }) => {
  const currentDom = useRef();
  const { cacheHandle } = useContext(KeepContext);

  const renderChildren =
    status !== ActionsStatus.INACTIVE || ActionsStatus.DESTROY
      ? children
      : () => null;

  const element = ReactDom.createPortal(
    <div
      ref={currentDom}
      style={{ display: status === ActionsStatus.INACTIVE ? 'none' : 'block' }}
    >
      {renderChildren()}
    </div>,
    document.body
  );

  useEffect(() => {
    if (status === ActionsStatus.ACTIVE) {
      loader && loader(currentDom.current);
    } else if (status === ActionsStatus.INACTIVE) {
      document.body.appendChild(currentDom.current);
      cacheHandle(ActionsStatus.INACTIVE, {
        cacheId,
      });
    }
  }, [status]);

  return element;
};

export default KeepAliveScope;
