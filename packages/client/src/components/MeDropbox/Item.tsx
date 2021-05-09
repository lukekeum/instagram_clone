import { css } from '@emotion/react';
import React from 'react';
import Icon, { IconType } from '../../assets/icons';

interface ItemProps {
  iconType?: IconType;
  content: string;
  upperline?: boolean;
  onClick?: () => {};
}

export default function Item({
  content,
  iconType,
  upperline = false,
  onClick,
}: ItemProps) {
  return (
    <div css={itemStyle(upperline)} onClick={onClick}>
      {iconType && <Icon name={iconType} />}
      <p>{content}</p>
    </div>
  );
}

const itemStyle = (upperline: boolean) => css`
  display: flex;
  align-items: center;
  padding: 0;
  font-size: 1rem;
  width: 11rem;
  height: 2.5rem;
  padding: 5px 0 5px 10px;
  background: #fff;
  border-radius: 5px;
  border-top: ${upperline ? '1px #DBDBDB solid;' : 'none'};
  & > p {
    padding: 0;
    padding-left: 10px;
  }
  &:hover {
    background: #fcfcfc;
  }
`;
