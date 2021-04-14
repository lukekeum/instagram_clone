import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContext } from '.';
import useLogin from '../../hooks/useLogin';

interface IFormProps {
  id?: string;
  children: React.ReactNode;
  value: {
    id: string;
    password: string;
  };
}

function Form({ children, id, value }: IFormProps) {
  const { login, loading, message } = useLogin();
  const { setError } = useContext(LoginContext);
  const history = useHistory();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      login(value);
    },
    [value, login],
  );

  useEffect(() => {
    if (message.status === 201) {
      history.push('/');
    } else {
      let errMessage = '';
      switch (message.status) {
        case 400:
          errMessage = '아이디나 패스워드가 잘못되었습니다';
          break;
        case 500:
          errMessage = 'Something went wrong';
          break;
      }
      setError!(errMessage);
    }
  }, [loading, message, history, setError]);

  return (
    <form id={id} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
