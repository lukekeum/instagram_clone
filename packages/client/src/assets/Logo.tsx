import LogoImage from './instagram.png';
import { SerializedStyles } from '@emotion/react';

function Logo({ ...rest }: { className?: string; css?: SerializedStyles }) {
  return <img src={LogoImage} {...rest} alt="logo" />;
}

export default Logo;
