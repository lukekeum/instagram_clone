import React from 'react';
import { css } from '@emotion/react';

interface IButtonProps {
  disabled: boolean;
}

function Button({ disabled }: IButtonProps) {
  return (
    <button css={ButtonStyle} disabled={disabled} type="submit">
      회원가입
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
  cursor: pointer;
  &:disabled {
    opacity: 30%;
    cursor: not-allowed;
  }
`;

export default Button;
