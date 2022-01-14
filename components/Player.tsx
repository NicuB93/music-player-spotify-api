/* eslint-disable @next/next/no-img-element */
import React, { FC, useEffect } from 'react';
import useSpotify from '@hooks/useSpotify';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTrackUriState, isPlayingState } from 'atoms/songAtom';
import SpotifyPlayer from 'react-spotify-web-playback';
import { playlistUriState } from 'atoms/playlistAton';

const Player: FC = () => {
  const spotifyApi = useSpotify();
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const trackUri = useRecoilValue(currentTrackUriState);
  const playlistUri = useRecoilValue(playlistUriState);

  const playerStyles = {
    activeColor: '#000',
    bgColor: '#000',
    color: '#fff',
    sliderHandleColor: '#1cb954',
    loaderColor: '#fff',
    sliderColor: '#1cb954',
    trackArtistColor: '#ccc',
    trackNameColor: '#fff',
  };

  useEffect(() => {
    setIsPlaying(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackUri, playlistUri]);

  return (
    <div>
      {spotifyApi.getAccessToken() && (
        <SpotifyPlayer
          token={spotifyApi.getAccessToken()}
          syncExternalDevice={true}
          showSaveIcon
          callback={(state) => {
            if (!state.isPlaying) setIsPlaying(false);
          }}
          play={isPlaying}
          uris={trackUri ? [trackUri] : [playlistUri]}
          magnifySliderOnHover={true}
          styles={playerStyles}
        />
      )}
    </div>
  );
};

export default Player;
