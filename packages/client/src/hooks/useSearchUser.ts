import { useCallback, useState } from 'react';
import client from '../lib/client';

interface IUser {
  id: string;
  user_id: string;
  email: string;
  profile: {
    tag: string;
    short_bio: string;
  };
}

interface IResult {
  found: boolean;
  data?: IUser[];
}

const useSearchUser = () => {
  const [result, setResult] = useState<IResult>({ found: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();

  const searchUser = useCallback(async (input: string) => {
    try {
      setLoading(true);
      const response = await client.get('/api/user/search', { input });
      setLoading(false);

      if (response.status === 404) {
        return setResult({ found: false });
      }

      const userData = response.data.data as IUser[];

      setResult({ found: true, data: userData });
    } catch (err) {
      setLoading(false);
      setError(err.response.data);
    }
  }, []);

  return { searchUser, result, loading, error } as const;
};

export default useSearchUser;
