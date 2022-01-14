import { atom } from 'recoil';

export const playlistState = atom({
  key: 'playlistState',
  default: null as unknown as SpotifyApi.SinglePlaylistResponse,
});

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: null as unknown as string,
});

export const playlistUriState = atom({
  key: 'playlistUriState',
  default: null as unknown as string,
});

export const likedPlaylistState = atom({
  key: 'likedPlaylist',
  default: null as unknown as SpotifyApi.UsersSavedTracksResponse,
});
export const isClickedlikedPlaylistState = atom({
  key: 'isClickedlikedPlaylist',
  default: undefined as unknown as boolean,
});
