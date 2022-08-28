import { React } from 'react';

const isFunction = (data) => {
  return typeof data === 'function';
};

export const renderWithChildren = (children) => (mergeProps) => {
  return children
    ? isFunction(children)
      ? children(mergeProps)
      : React.isValidElement(children)
      ? React.cloneElement(children, mergeProps)
      : null
    : null;
};
