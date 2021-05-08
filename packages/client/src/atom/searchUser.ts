import { atom, useRecoilState } from 'recoil';

interface IUser {
  id: string;
  user_id: string;
  email: string;
  profiles: {
    tag: string;
    short_bio: string;
  };
}

export interface ISearchUser {
  loading: boolean;
  data?: IUser[];
}

const searchUserAtom = atom<ISearchUser>({
  key: 'search_user',
  default: {
    loading: false,
  },
});

export default function useSearchUserAtom() {
  return useRecoilState(searchUserAtom);
}
