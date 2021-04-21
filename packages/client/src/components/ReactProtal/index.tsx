import React from 'react';
import ReactDOM from 'react-dom';

interface IReactPortal {
  children: React.ReactNode;
}

function ReactPortal({ children }: IReactPortal) {
  const element = document.getElementById('#react_portal');
  if (!element) return <></>;
  return ReactDOM.createPortal(children, element);
}

export default ReactPortal;
