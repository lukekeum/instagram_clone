import { useCallback, useState } from 'react';
import { useAuthState } from '../atom/auth';
import client from '../lib/client';

interface ILoginFunctionResponse {
  status?: number;
  message?: string;
}

interface ILoginData {
  message: string;
  data: {
    id: string;
    user_id: string;
    email: string;
    profile: {
      tag: string;
      short_bio: string | null;
    };
  };
  token: string;
}

const useLogin = () => {
  const [, setAuthState] = useAuthState();
  const [message, setMessage] = useState<ILoginFunctionResponse>({});
  const [loading, setLoading] = useState(false);

  const login = useCallback(
    async ({ id, password }: { id: string; password: string }) => {
      try {
        setLoading(true);

        const response = await client.post('/api/auth/login', {
          id,
          password,
        });

        setLoading(false);

        if (response.status !== 201) {
          setMessage({ status: response.status, message: 'Unknown Error' });
          return false;
        }

        const data = response.data as ILoginData;

        setAuthState({
          authenticated: true,
          profile: {
            uuid: data.data.id,
            user_id: data.data.user_id,
            user_tag: data.data.profile.tag,
            short_bio: data.data.profile.short_bio,
          },
        });

        client.authHeaderSetup(data.token);

        setMessage({ status: 201, message: '로그인 성공' });
      } catch (err) {
        setMessage({
          status: err.response.status,
          message: err.response.data.message,
        });
      }
    },
    [setAuthState],
  );

  return { login, message, loading };
};

export default useLogin;
