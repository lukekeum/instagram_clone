import { useCallback, useEffect } from 'react';

const useOutsideClickHandler = <T>(
  ref: React.RefObject<T>,
  callback: Function,
) => {
  const outsideClickHandler = useCallback(
    (e: any) => {
      if (ref.current && !(ref.current as any).contains(e.target)) {
        callback();
      }
    },
    [ref, callback],
  );

  useEffect(() => {
    window.addEventListener('click', outsideClickHandler);
    return () => {
      window.removeEventListener('click', outsideClickHandler);
    };
  }, [outsideClickHandler]);
};

export default useOutsideClickHandler;
