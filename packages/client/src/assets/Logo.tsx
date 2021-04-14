import LogoImage from './instagram.png';

function Logo({ className }: { className: string }) {
  return <img src={LogoImage} className={className} alt="logo" />;
}

export default Logo;
