import { atom } from 'recoil';

export const isSearchActiveState = atom({
  key: 'isSearchActiveState',
  default: undefined as unknown as boolean,
});
export const searchState = atom({
  key: 'searchState',
  default: undefined as unknown as string,
});
