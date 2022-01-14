import { atom } from 'recoil';

export const currentTrackIdState = atom({
  key: 'currentTrackIdState',
  default: undefined as unknown as string,
  //SpotifyApi.CurrentlyPlayingResponse
});

export const currentTrackUriState = atom({
  key: 'currentTrackUriState',
  default: undefined as unknown as string,
});

export const currentTrackInfo = atom({
  key: 'currentTrackInfo',
  default: undefined as unknown as SpotifyApi.TrackObjectFull,
  //SpotifyApi.CurrentlyPlayingResponse
});

export const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});
