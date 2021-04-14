import { css } from '@emotion/react';

export const InputStyle = (isError: any) => css`
  width: 23rem;
  padding: 1rem 1rem;
  border-radius: 5px;
  border: 1px solid ${isError ? '#ef5350' : '#c8c8c8'};
  color: #9d9d9d;
  font-family: 'Roboto';
  font-size: 1rem;
  margin-bottom: 2rem;
  &:last-of-type {
    margin-bottom: 0rem;
  }
`;
