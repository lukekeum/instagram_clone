import { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useRegister, { IRegisterParams } from './useRegister';

const useRegisterForm = (
  setError: React.Dispatch<React.SetStateAction<string>>,
) => {
  const { register, loading, message } = useRegister();
  const history = useHistory();

  const onSubmit = useCallback(
    (value: IRegisterParams) => (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      register(value);
    },
    [register],
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
      setError(errMessage);
    }
  }, [loading, message, history, setError]);

  return { onSubmit };
};

export default useRegisterForm;
