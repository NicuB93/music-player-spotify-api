import React, { FC, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { searchState } from '../atoms/searchAtom';
import useSpotify from '../hooks/useSpotify';
import { SearchIcon } from '@heroicons/react/outline';
import { currentTrackUriState } from 'atoms/songAtom';
import { millisToMinutesAndSeconds } from 'lib/time';

const Search: FC = ({}) => {
  const [search, setSearch] = useRecoilState(searchState);
  const [searchResults, setSearchResults] = useState<
    SpotifyApi.SearchResponse | undefined
  >();
  const spotifyApi = useSpotify();
  const accessToken = spotifyApi.getAccessToken();

  const [currentTrackUri, setCurrentTrackUri] =
    useRecoilState(currentTrackUriState);

  useEffect(() => {
    if (!search) return setSearchResults(undefined);
    if (!accessToken) return;

    spotifyApi.searchTracks(search).then((res) => {
      setSearchResults(res.body);
    });
  }, [search, accessToken]);

  const playSong = (uri: string) => {
    setCurrentTrackUri(uri);
  };

  return (
    <div className="flex-grow justify-center">
      <div className="pt-2 relative mx-auto text-gray-600 m-5">
        <input
          className="bg-gray-900 h-10 px-5 pr-16 text-sm focus:outline-none w-full"
          type="search"
          name="search"
          placeholder="Search"
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <button className="absolute right-0 top-0 mt-5 mr-4">
          <SearchIcon className="w-5 h-5" />
        </button>
      </div>
      <div className="flex-grow">
        {!search
          ? ''
          : searchResults?.tracks?.items.map((song, i: number) => (
              <div
                key={i}
                className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900"
              >
                <div
                  className="flex items-center space-x-4 rounded-lg cursor-pointer"
                  onClick={() => playSong(song.uri)}
                >
                  <p>{i + 1}</p>
                  <img
                    className="h-10 w-10"
                    src={song.album.images[0].url}
                    alt=""
                  />
                  <div>
                    <p className="w-36 lg:w-64 text-white truncate">
                      {song.name}
                    </p>
                    <p className="w-40">{song.artists[0].name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between ml-auto md:ml-0">
                  <p className="w-40 hidden md:inline">{song.album.name}</p>
                  <p>{millisToMinutesAndSeconds(song.duration_ms)}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Search;
