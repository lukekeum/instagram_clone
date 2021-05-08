import React from 'react';
import { css } from '@emotion/react';

interface ISearchedUserItem {
  user_id?: string;
  tag?: string;
}

function SearchedUserItem({ user_id, tag }: ISearchedUserItem) {
  return (
    <div css={SearchedUserItemStyle}>
      <h1>{tag}</h1>
      <span>{user_id}</span>
    </div>
  );
}

const SearchedUserItemStyle = css`
  display: inline-flex;
  flex-direction: column;
  height: 3.5rem;
  border-bottom: 1px solid #9d9d9d;
  color: #707070;
  justify-content: center;
  margin-left: 1rem;
  margin-right: 1rem;
  h1 {
    margin: 0;
    font-weight: 500;
    font-size: 1rem;
  }
  span {
    color: #808080;
  }
`;

export default React.memo(SearchedUserItem);
