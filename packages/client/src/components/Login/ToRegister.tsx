import React from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

function ToRegister() {
  return (
    <div css={ToRegisterStyle}>
      <span>새로오셨나요?</span>
      <Link to="/register">
        <span>회원가입</span>
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

export default ToRegister;
