import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { RegisterContext } from '.';
import useRegister from '../../hooks/useRegister';
import client from '../../lib/client';

interface IFormProps {
  id?: string;
  children: React.ReactNode;
  value: {
    id: string;
    email: string;
    password: string;
    tag: string;
  };
}

function Form({ children, id, value }: IFormProps) {
  const { register, loading, message } = useRegister();
  const { setError } = useContext(RegisterContext);
  const history = useHistory();

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      register(value);
    },
    [value, register],
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

  return (
    <form id={id} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
