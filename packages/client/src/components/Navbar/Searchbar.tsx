import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import useOutsideClickHandler from '../../hooks/useOutsideClick';
import useSearchUser from '../../hooks/useSearchUser';
import SearchUser from '../SearchUser';
import _ from 'lodash';

function Searchbar() {
  const SearchTextEl = useRef<HTMLSpanElement>(null);
  const InputEl = useRef<HTMLInputElement>(null);
  const WrapperEl = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState('');
  const { searchUser, result } = useSearchUser();
  const delayedSearchUser = useRef(
    _.debounce((input) => searchUser(input), 500),
  ).current;

  useOutsideClickHandler(WrapperEl, () => {
    setClicked(false);
  });

  useEffect(() => {
    InputEl?.current?.focus();
  }, [clicked]);

  useEffect(() => {
    console.log(result);
  }, [result]);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (clicked) return;
      setClicked(true);
    },
    [setClicked, clicked],
  );

  const onChangeEvent = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);
      delayedSearchUser(e.target.value);
      if (searchInput.trim() === '') {
      }
    },
    [setSearchInput, delayedSearchUser, searchInput],
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      ref={WrapperEl}
    >
      <div css={SearchbarStyle(clicked)} onClick={onClick}>
        <span ref={SearchTextEl}>{searchInput ? searchInput : '검색'}</span>
        <input
          ref={InputEl}
          value={searchInput}
          placeholder="검색"
          onChange={onChangeEvent}
        />
      </div>
      {clicked && <SearchUser />}
    </div>
  );
}

const SearchbarStyle = (clicked: boolean) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 215px;
  border: 1px solid #dbdbdb;
  background-color: #fafafa;
  border-radius: 3px;
  color: #8e8e8e;
  font-size: 0.875rem;
  cursor: text;
  height: 26px;
  & > span {
    ${clicked && 'display: none;'}
  }
  & > input {
    ${!clicked && 'display: none;'}
    padding: 0;
    background: #fafafa;
    width: 100%;
    padding-left: 1rem;
    font-size: 0.875rem;
    outline: none;
    border: none;
  }
`;

export default Searchbar;
