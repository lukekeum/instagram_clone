import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import Logo from '../../assets/Logo';
import useInput from '../../hooks/useInput';
import ToLogin from './ToLogin';
import Button from './Button';
import { InputStyle } from './Input';
import useRegisterForm from '../../hooks/useRegisterForm';

function RegisterComponent() {
  const [email, onChangeEmail] = useInput();
  const [id, onChangeID] = useInput();
  const [password, onChangePassword] = useInput();
  const [tag, onChangeTag] = useInput();
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { onSubmit } = useRegisterForm(setError);

  useEffect(() => {
    if (!email || !id || !password || !tag) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email, id, password, tag]);

  return (
    <div css={ComponentStyle}>
      <div id="register__wrapper">
        <Logo className="register__logo" />
        <ToLogin />
        <form
          id="register__form"
          onSubmit={onSubmit({ id, password, email, tag })}
        >
          <div>
            <input
              css={InputStyle(error)}
              type="email"
              value={email}
              placeholder="이메일"
              onChange={onChangeEmail}
            />
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
            <input
              css={InputStyle(error)}
              type="text"
              value={tag}
              placeholder="태그"
              onChange={onChangeTag}
            />
            <span id="register__error_span">{error}</span>
          </div>
          <Button disabled={disabled} />
        </form>
      </div>
    </div>
  );
}

const ComponentStyle = css`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: white;
  #register__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 31.25rem;
    height: 46.875rem;
    border-radius: 15px;
    border: 1px solid #c8c8c8;
    .register__logo {
      margin-top: 5.9375rem;
      width: 206px;
      height: 58px;
      margin-bottom: 5rem;
    }
    #register__form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        & > span {
          margin-bottom: 2.35rem;
        }
      }
    }
    #register__error_span {
      display: flex;
      height: 1rem;
      font-size: 0.9rem;
      margin-top: 1rem;
      margin-left: 1rem;
      color: #ef5350;
    }
  }
`;

export default RegisterComponent;
