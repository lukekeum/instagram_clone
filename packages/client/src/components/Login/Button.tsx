import React from 'react';
import { css } from '@emotion/react';

interface IButtonProps {
  disabled: boolean;
}

function Button({ disabled }: IButtonProps) {
  return (
    <button css={ButtonStyle} disabled={disabled} type="submit">
      로그인
    </button>
  );
}

const ButtonStyle = css`
  width: 25.125rem;
  padding: 1rem 1rem;
  font-size: 1.25rem;
  font-weight: bolder;
  border: none;
  border-radius: 5px;
  color: white;
  background: #0095f6;
  margin-top: 13rem;
  cursor: pointer;
  &:disabled {
    opacity: 30%;
    cursor: not-allowed;
  }
`;

export default Button;
