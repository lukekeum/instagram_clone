import { atom, useRecoilState } from 'recoil';

export interface IAuthAtom {
  authenticated: boolean;
  profile?: {
    uuid: string;
    user_id: string;
    user_tag: string;
    short_bio: string | null;
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
