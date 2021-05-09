import React from 'react';
import { css } from '@emotion/react';
import Item from './Item';

interface MeDropboxProps {
  opened: boolean;
}

export default function MeDropbox({ opened }: MeDropboxProps) {
  return (
    <div css={WrapperStyle(opened)}>
      <div id="me_dropbox__container">
        <Item iconType="profile" content="프로필" />
        <Item iconType="settings" content="설정" />
        <Item upperline={true} content="로그아웃" />
      </div>
      <div id="me_dropbox__square"></div>
    </div>
  );
}

const WrapperStyle = (opened: boolean) => css`
  display: ${opened ? 'flex' : 'none'};
  user-select: none;
  flex-direction: column;
  background: white;
  position: absolute;
  box-shadow: 0 0 5px 1px rgb(0 0 0 / 30%);
  border-radius: 5px;
  padding: 0;
  top: 50px;
  & > #me_dropbox__square {
    display: block;
    position: absolute;
    top: -8px;
    right: 4px;
    width: 16px;
    height: 16px;
    background: #fff;
    /* box-shadow: 0 0 5px 1px rgb(0 0 0 / 30%); */
    transform: rotate(45deg);
    z-index: 11;
  }
  & > #me_dropbox__container {
    z-index: 13;
  }
`;
