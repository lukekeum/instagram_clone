import { atom, useRecoilState } from 'recoil';

type TStringORNull = string | null;

interface IAuthAtom {
  authenticated: boolean;
  profile: {
    user_id: TStringORNull;
    user_tag: TStringORNull;
    display_name: TStringORNull;
  };
}

const authAtom = atom<IAuthAtom>({
  key: 'auth',
  default: {
    authenticated: false,
    profile: {
      user_id: null,
      user_tag: null,
      display_name: null,
    },
  },
});

export default function useAuthAtom() {
  const [auth, setAuth] = useRecoilState(authAtom);
  return [auth, setAuth] as const;
}
