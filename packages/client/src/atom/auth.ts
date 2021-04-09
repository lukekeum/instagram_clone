import { atom, useRecoilState } from 'recoil';

export interface IAuthAtom {
  authenticated: boolean;
  profile?: {
    user_id: string;
    user_tag: string;
    display_name: string;
  };
}

export const authAtom = atom<IAuthAtom>({
  key: 'auth',
  default: {
    authenticated: false,
  },
});

export function useAuthState() {
  return useRecoilState(authAtom);
}
