import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export function useLoading(loadingState, setter, path) {
  const navigate = useNavigate();

  useEffect(() => {
    if (loadingState) {
      setTimeout(() => {
        navigate(path, { replace: true });
        setter(false);
      }, 1500);
    }
  }, [loadingState]);
}
