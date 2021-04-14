import React, { createContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Logo from '../../assets/Logo';
import ToRegister from './ToRegister';
import Button from './Button';
import Form from './Form';
import useInput from '../../hooks/useInput';
import { InputStyle } from './Input';

interface ILoginContext {
  setError?: React.Dispatch<React.SetStateAction<string>>;
  error?: string;
}

export const LoginContext = createContext<ILoginContext>({});

function LoginComponent() {
  const [id, onChangeID] = useInput();
  const [password, onChangePassword] = useInput();
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || !password) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [id, password]);

  return (
    <LoginContext.Provider value={{ error, setError }}>
      <div css={ComponentStyle}>
        <div id="login__wrapper">
          <Logo className="login__logo" />
          <ToRegister />
          <Form id="login__form" value={{ id, password }}>
            <input
              css={InputStyle(error)}
              type="text"
              value={id}
              placeholder="아이디"
              onChange={onChangeID}
            />
            <input
              css={InputStyle(error)}
              type="password"
              value={password}
              placeholder="비밀번호"
              onChange={onChangePassword}
            />
            <span id="login__error_span">{error}</span>
            <Button disabled={disable} />
          </Form>
        </div>
      </div>
    </LoginContext.Provider>
  );
}

const ComponentStyle = css`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: white;
  #login__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 31.25rem;
    height: 46.875rem;
    border-radius: 15px;
    border: 1px solid #c8c8c8;
    .login__logo {
      margin-top: 5.9375rem;
      width: 206px;
      height: 58px;
      margin-bottom: 5rem;
    }
    #login__form {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    #login__error_span {
      display: block;
      height: 1rem;
      font-size: 0.9rem;
      margin-top: 1rem;
      margin-left: 1rem;
      color: #ef5350;
    }
  }
`;

export default LoginComponent;
