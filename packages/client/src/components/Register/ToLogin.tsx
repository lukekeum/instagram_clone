import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

function ToLogin() {
  return (
    <div css={ToRegisterStyle}>
      <span>다시오셨나요?</span>
      <Link to="/login">
        <span>로그인</span>
      </Link>
    </div>
  );
}

const ToRegisterStyle = css`
  margin-bottom: 1rem;
  a {
    text-decoration: none;
  }
  span {
    font-size: 0.8125rem;
  }
  span:first-of-type {
    margin-right: 0.25rem;
  }
  span:last-child {
    color: #0095f6;
  }
`;

export default ToLogin;
