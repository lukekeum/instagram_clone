import { atom, useRecoilState } from 'recoil';

type TStringORNull = string | null;

export interface IAuthAtom {
  authenticated: boolean;
  profile: {
    user_id: TStringORNull;
    user_tag: TStringORNull;
    display_name: TStringORNull;
  };
}

export const authAtom = atom<IAuthAtom>({
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

export function useAuthState() {
  return useRecoilState(authAtom);
}
