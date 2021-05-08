import React from 'react';
import { css } from '@emotion/react';
import SearchedUser from './SearchedUser';
import { ISearchUser } from '../../atom/searchUser';

function NotFound() {
  return (
    <div css={NotFoundStyle}>
      <span>검색 결과가 없습니다.</span>
    </div>
  );
}

interface ContentProps {
  result: ISearchUser;
}

function Content({ result }: ContentProps) {
  return (
    <>
      {!result.loading && !result.data && <NotFound />}
      {!result.loading && result.data && <SearchedUser user={result} />}
    </>
  );
}

const NotFoundStyle = css`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #8e8e8e;
`;

function resultPropsAreEqual(prev: ContentProps, next: ContentProps): boolean {
  return prev.result.data === next.result.data || next.result.loading;
}

export default React.memo(Content, resultPropsAreEqual);
