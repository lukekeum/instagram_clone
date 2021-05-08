import React from 'react';
import { css } from '@emotion/react';
import { ISearchUser } from '../../atom/searchUser';
import SearchedUserItem from './SearchedUserItem';

interface SearchedUserProps {
  user: ISearchUser;
}

function SearchedUser({ user }: SearchedUserProps) {
  return (
    <div css={SearchedUserStyle}>
      {!user.loading &&
        user.data?.map((v) => (
          <SearchedUserItem
            user_id={v.user_id}
            tag={v.profiles?.tag}
            key={v.id}
          />
        ))}
    </div>
  );
}

const SearchedUserStyle = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export default React.memo(
  SearchedUser,
  (prev, next) => prev.user !== next.user,
);
