import React, { useEffect, useMemo, useState } from 'react';
import { css } from '@emotion/react';
import Icon from '../../assets/icons';
import { Link, useLocation } from 'react-router-dom';

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
  const [currentLocation, setCurrentLocation] = useState<EActivity>(
    EActivity.HOME,
  );

  useEffect(() => {
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
  }, [currentPath, currentLocation]);

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
      <span id="me_icon">
        <Icon name="me" />
      </span>
    </div>
  );
}

const ActivityStyle = css`
  display: flex;
  align-items: center;
  & > span {
    margin-left: 1.375rem;
    cursor: pointer;
  }
  & > span:nth-of-type(1) {
    margin-left: 0;
  }
`;

export default Activity;
