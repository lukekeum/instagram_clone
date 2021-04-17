import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useLogin, { ILoginParams } from './useLogin';

const useLoginForm = (
  setError: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { login, loading, message } = useLogin();
  const history = useHistory();

  const onSubmit = useCallback(
    (value: ILoginParams) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      login(value);
    },
    [login],
  );

  useEffect(() => {
    if (message.status === 201) {
      history.push('/');
    } else {
      let errMessage = '';
      switch (message.status) {
        case 400:
          errMessage = '이미 존재하는 유저입니다';
          break;
        case 500:
          errMessage = 'Something went wrong';
          break;
      }
      if (!setError) return;
      setError!(errMessage);
    }
  }, [loading, message, history, setError]);

  return { onSubmit };
};

export default useLoginForm;
