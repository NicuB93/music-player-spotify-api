import { SearchIcon, HeartIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import useSpotify from '@hooks/useSpotify';
import { useRecoilState } from 'recoil';
import {
  isClickedlikedPlaylistState,
  likedPlaylistState,
  playlistIdState,
  playlistUriState,
} from 'atoms/playlistAton';
import { isSearchActiveState } from 'atoms/searchAtom';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[]
  >([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);
  const [playlistUri, setPlaylistUri] = useRecoilState(playlistUriState);
  const [isPlaylistClicked, setIsPlaylistClicked] = useRecoilState(
    isClickedlikedPlaylistState
  );
  const [isSearchActive, setIisSearchActive] =
    useRecoilState(isSearchActiveState);
  const [likedPlaylist, setLikedPlaylist] = useRecoilState(likedPlaylistState);
  // const [playlist, setPlaylist] = useRecoilState(playlistState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !isPlaylistClicked) {
      spotifyApi.getMySavedTracks({ limit: 50 }).then((data) => {
        setLikedPlaylist(data.body);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, spotifyApi, isPlaylistClicked]);

  console.log(isSearchActive);

  return (
    <div className="text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex">
      <div className="space-y-4">
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => setIisSearchActive(true)}
        >
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => {
            setIisSearchActive(false);
            setIsPlaylistClicked(false);
          }}
        >
          <HeartIcon className="h-5 w-5" />
          <p>Liked Songs</p>
        </button>
        <button
          className="flex items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
        <hr className="border-t-[0.1px] border-gray-900" />

        {/* {Playlists} */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => {
              setPlaylistUri(playlist.uri);
              setPlaylistId(playlist.id);
              setIsPlaylistClicked(true);
              setIisSearchActive(false);
            }}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
