import { useCallback, useState } from 'react';
import { useAuthState } from '../atom/auth';
import client from '../lib/client';

interface IRegisterParams {
  id: string;
  email: string;
  password: string;
  tag: string;
}

interface IRegisterFunctionResponse {
  status?: number;
  message?: string;
}

interface IRegisterData {
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

const useRegister = () => {
  const [, setAuthState] = useAuthState();
  const [message, setMessage] = useState<IRegisterFunctionResponse>({});
  const [loading, setLoading] = useState(false);

  const register = useCallback(
    async ({ id, email, password, tag }: IRegisterParams) => {
      try {
        setLoading(true);

        const response = await client.post('/api/auth/register', {
          id,
          email,
          password,
          tag,
        });

        setLoading(false);

        if (response.status !== 201) {
          setMessage({
            status: response.status,
            message: response.data.message,
          });
        }

        const data = response.data as IRegisterData;

        setAuthState({
          authenticated: true,
          profile: {
            uuid: data.data.id,
            user_id: data.data.user_id,
            user_tag: data.data.profile.tag,
            short_bio: data.data.profile.short_bio,
          },
        });

        setMessage({
          status: 201,
          message: 'Register Succeed',
        });
      } catch (err) {
        setMessage({
          status: err.response.status,
          message: err.response.data.message,
        });
      }
    },
    [setAuthState],
  );

  return { register, message, loading };
};

export default useRegister;
