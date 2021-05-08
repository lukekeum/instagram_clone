import React from 'react';
import { css } from '@emotion/react';
import Content from './Content';
import useSearchUserAtom from '../../atom/searchUser';

const SearchUser = () => {
  const [result] = useSearchUserAtom();

  return (
    <div css={SearchUserStyle}>
      <div id="searchuser__container">
        <Content result={result} />
      </div>
      <div id="searchuser__rectengle"></div>
    </div>
  );
};

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
