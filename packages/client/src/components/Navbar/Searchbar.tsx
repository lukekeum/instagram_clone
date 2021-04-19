import React, { useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import useOutsideClickHandler from '../../hooks/useOutsideClick';
import SearchUser from '../SearchUser';

function Searchbar() {
  const SearchTextEl = useRef<HTMLSpanElement>(null);
  const InputEl = useRef<HTMLInputElement>(null);
  const WrapperEl = useRef<HTMLDivElement>(null);
  const searchUserEl = useRef<HTMLDivElement>(null);
  const [clicked, setClicked] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState('');

  useOutsideClickHandler(WrapperEl, () => {
    setClicked(false);
    setSearchInput('');
  });

  useEffect(() => {
    InputEl?.current?.focus();
  }, [clicked]);

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
    },
    [setSearchInput],
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
        <span ref={SearchTextEl}>검색</span>
        <form>
          <input
            ref={InputEl}
            value={searchInput}
            placeholder="검색"
            onChange={onChangeEvent}
          />
        </form>
      </div>
      {clicked && <SearchUser ref={searchUserEl} />}
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
  cursor: pointer;
  height: 26px;
  & > span {
    ${clicked && 'display: none;'}
  }
  & > form {
    display: ${!clicked ? 'none' : 'flex'};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  & > form > input {
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
