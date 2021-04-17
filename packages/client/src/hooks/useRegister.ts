import { useCallback, useState } from 'react';
import client from '../lib/client';
import useLogin from './useLogin';

export interface IRegisterParams {
  id: string;
  email: string;
  password: string;
  tag: string;
}

interface IRegisterFunctionResponse {
  status?: number;
  message?: string;
}

const useRegister = () => {
  const [message, setMessage] = useState<IRegisterFunctionResponse>({});
  const [loading, setLoading] = useState(false);
  const { login } = useLogin();

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

        login({ id, password });

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
    [login],
  );

  return { register, message, loading };
};

export default useRegister;
