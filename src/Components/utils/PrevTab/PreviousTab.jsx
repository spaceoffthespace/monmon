import { useEffect, useRef } from 'react';

const usePreviousTab = (value) => {
  const previousValueRef = useRef(null);

  useEffect(() => {
    previousValueRef.current = value;
  }, [value]);

  const getPreviousTab = () => {
    return previousValueRef.current;
  };

  return { getPreviousTab };
};

export default usePreviousTab;
