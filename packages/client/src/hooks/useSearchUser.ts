import { useCallback, useEffect, useState } from 'react';
import useSearchUserAtom from '../atom/searchUser';
import client from '../lib/client';

interface IUser {
  id: string;
  user_id: string;
  email: string;
  profiles: {
    tag: string;
    short_bio: string;
  };
}

export interface IResult {
  data?: IUser[];
}

const useSearchUser = () => {
  const [, setResult] = useSearchUserAtom();
  const [error, setError] = useState<any>();

  const searchUser = useCallback(
    async (input: string) => {
      if (!input) return;
      setError(null);

      try {
        setResult({ loading: true });
        const response = await client.get(`/api/user/search?search=${input}`);
        setResult({ loading: false });

        if (response.data.message) {
          return;
        }

        const userData = response.data.data as IUser[];

        setResult((prev) => ({ ...prev, data: userData }));
      } catch (err) {
        setError(err.response.data);
      }
    },
    [setResult],
  );

  useEffect(() => {
    setResult({ loading: false });
  }, [setResult]);

  return { searchUser, error } as const;
};

export default useSearchUser;
