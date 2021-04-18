import { useEffect, useState } from 'react';
import client from '../lib/client';

const useLoadingbar = () => {
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    client.client.interceptors.request.use(
      (config) => {
        setLoading((prev) => prev + 1);
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    client.client.interceptors.response.use(
      (response) => {
        setLoading((prev) => Math.max(0, prev - 1));
        return response;
      },
      (err) => {
        setLoading((prev) => Math.max(0, prev - 1));
        return Promise.reject(err);
      },
    );
  }, []);

  return { loading };
};

export default useLoadingbar;
