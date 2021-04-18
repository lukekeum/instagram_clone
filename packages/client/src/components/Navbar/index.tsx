import React from 'react';
import { css } from '@emotion/react';
import Logo from '../../assets/Logo';
import Searchbar from './Searchbar';
import Activity from './Activity';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <section css={NavbarStyle}>
      <div id="navbar__wrapper">
        {/* Instagram Logo */}
        <Link to="/">
          <Logo
            className="navbar__logo"
            css={css({ height: '29px', width: '103px', paddingTop: '7px' })}
          />
        </Link>
        {/* Search bar */}
        <Searchbar />
        {/* Activity */}
        <Activity />
      </div>
    </section>
  );
}

const NavbarStyle = css`
  display: flex;
  width: 100vw;
  height: 3.375rem;
  border-bottom: 1px solid #dbdbdb;
  justify-content: center;
  #navbar__wrapper {
    display: flex;
    padding: 0 20px;
    width: 100%;
    max-width: 935px;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }
`;

export default Navbar;
