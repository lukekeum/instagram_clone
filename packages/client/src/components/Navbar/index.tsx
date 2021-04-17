import React from 'react';
import { css } from '@emotion/react';

function Navbar() {
  return <section css={NavbarStyle}></section>;
}

const NavbarStyle = css`
  display: flex;
  width: 100vw;
  height: 3.375rem;
`;

export default Navbar;
