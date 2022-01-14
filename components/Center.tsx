/* eslint-disable @next/next/no-img-element */
import { useSession, signOut } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isClickedlikedPlaylistState,
  playlistIdState,
  playlistState,
} from 'atoms/playlistAton';
import useSpotify from '@hooks/useSpotify';
import Songs from './Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];
const Center = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [color, setColor] = useState<string | undefined>('');
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const isPlaylistClicked = useRecoilValue(isClickedlikedPlaylistState);

  useEffect(() => setColor(shuffle(colors).pop()), [playlistId]);
  useEffect(() => {
    spotifyApi.getAccessToken() &&
      spotifyApi
        .getPlaylist(playlistId)
        .then((data) => setPlaylist(data.body))
        .catch((err) => console.log('Something went wrong'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spotifyApi, playlistId]);

  return !playlistId ? (
    <div className="w-full flex justify-center items-center ">
      <h2 className="text-white text-lg font-bold">
        Please choose a playlist from the left first
      </h2>
    </div>
  ) : (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div
          className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
          onClick={() => signOut()}
        >
          <div className="w-10">
            <img
              src={session && session?.user?.image}
              alt=""
              className="rounded-full w-10 h-10"
            />
          </div>
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <div>
          {isPlaylistClicked ? (
            <img
              className="h-44 w-44 shadow-2xl"
              src={playlist?.images[0].url}
              alt="playlist image"
            />
          ) : (
            <HeartIcon className="h-44 w-44 shadow-2xl bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500" />
          )}
        </div>
        <div>
          <p>PLAYLIST</p>
          <h1 className="text-2xl md:text-3xl xl:test-5xl font-bold">
            {isPlaylistClicked ? playlist?.name : 'Liked Songs'}
          </h1>
        </div>
      </section>
      <section className="h-screen overflow-y-scroll scrollbar-hide">
        <Songs />
      </section>
    </div>
  );
};

export default Center;
