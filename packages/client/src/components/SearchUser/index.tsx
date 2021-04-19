import React, { forwardRef } from 'react';
import { css } from '@emotion/react';

const SearchUser = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} css={SearchUserStyle}>
      <div id="searchuser__container"></div>
      <div id="searchuser__rectengle"></div>
    </div>
  );
});

const SearchUserStyle = css`
  position: absolute;
  top: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 5px 1px rgb(0 0 0 / 30%);
  & > #searchuser__rectengle {
    position: absolute;
    top: -8px;
    width: 16px;
    height: 16px;
    background: #fff;
    transform: rotate(45deg);
    z-index: 9;
  }
  & > #searchuser__container {
    width: 375px;
    height: 350px;
    border-radius: 5px;
    z-index: 10;
  }
`;

export default SearchUser;
