import React, { useCallback, useState } from 'react';
import { useAuthState } from '../atom/auth';
import client from '../lib/client';

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

const useCheckLogin = () => {
  const [, setAuthState] = useAuthState();
  const [loading, setLoading] = useState(false);

  const checkLogin = useCallback(async () => {
    try {
      setLoading(true);

      const response = await client.patch('/api/auth/refresh');

      if (response.status !== 201) {
        return;
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

      setLoading(false);
    } catch (err) {}
  }, [setAuthState]);

  return { checkLogin, loading } as const;
};

export default useCheckLogin;
