import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/react';
import Icon from '../../assets/icons';
import { Link, useLocation } from 'react-router-dom';
import MeDropbox from '../MeDropbox';
import useOutsideClickHandler from '../../hooks/useOutsideClick';

enum EActivity {
  HOME,
  DIRECT,
  EXPLORER,
  FEED,
  NONE,
}

function Activity() {
  const location = useLocation();
  const currentPath = useMemo(() => location.pathname, [location]);
  const meDropboxEl = useRef<HTMLSpanElement>(null);
  const [meDropboxOpened, setMeDropboxOpened] = useState<boolean>(false);
  const [currentLocation, setCurrentLocation] = useState<EActivity>(
    EActivity.HOME,
  );

  const setLocation = useCallback((currentPath: string) => {
    switch (currentPath) {
      case '/':
        setCurrentLocation(EActivity.HOME);
        break;
      case '/direct':
        setCurrentLocation(EActivity.DIRECT);
        break;
      case '/explorer':
        setCurrentLocation(EActivity.EXPLORER);
        break;
      case '/feed':
        setCurrentLocation(EActivity.FEED);
        break;
      default:
        setCurrentLocation(EActivity.NONE);
        break;
    }
  }, []);

  useEffect(() => {
    setLocation(currentPath);
  }, [setLocation, currentPath, setCurrentLocation]);

  useOutsideClickHandler(meDropboxEl, () => {
    setMeDropboxOpened(false);
    setLocation(currentPath);
  });

  const onMeIconClick = useCallback(() => {
    setMeDropboxOpened((prev) => !prev);
    if (meDropboxOpened) {
      return setLocation(currentPath);
    }
    return setCurrentLocation(EActivity.NONE);
  }, [meDropboxOpened, currentPath, setLocation]);

  return (
    <div css={ActivityStyle}>
      <span id="avtivity__home">
        <Link to="/">
          <Icon
            name={currentLocation === EActivity.HOME ? 'homeActive' : 'home'}
          />
        </Link>
      </span>
      <span id="avtivity__direct">
        <Link to="/">
          <Icon
            name={
              currentLocation === EActivity.DIRECT ? 'directActive' : 'direct'
            }
          />
        </Link>
      </span>
      <span id="activity__explorer">
        <Link to="/">
          <Icon
            name={
              currentLocation === EActivity.EXPLORER
                ? 'explorerActive'
                : 'explorer'
            }
          />
        </Link>
      </span>
      <span id="activity__feed">
        <Link to="/">
          <Icon
            name={currentLocation === EActivity.FEED ? 'feedActive' : 'feed'}
          />
        </Link>
      </span>
      <span id="me_icon" ref={meDropboxEl} onClick={onMeIconClick}>
        <Icon name="me" />
        <MeDropbox opened={meDropboxOpened} />
      </span>
    </div>
  );
}

const ActivityStyle = css`
  display: flex;
  align-items: center;
  & > span {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-left: 1.375rem;
    cursor: pointer;
  }
  & > span:nth-of-type(1) {
    margin-left: 0;
  }
`;

export default Activity;
