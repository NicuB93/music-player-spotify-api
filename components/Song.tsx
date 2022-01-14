/* eslint-disable @next/next/no-img-element */
import { currentTrackUriState } from 'atoms/songAtom';
import { millisToMinutesAndSeconds } from 'lib/time';
import { useRecoilState } from 'recoil';

type SongDetails = {
  order: number;
  song: SpotifyApi.PlaylistTrackObject | SpotifyApi.SavedTrackObject;
};

const Song = ({ order, song }: SongDetails) => {
  const [currentTrackUri, setCurrentTrackUri] =
    useRecoilState(currentTrackUriState);

  const playSong = () => {
    setCurrentTrackUri(song.track.uri);
  };

  return (
    <div
      className="grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4 rounded-lg cursor-pointer">
        <p>{order + 1}</p>
        <img
          className="h-10 w-10"
          src={song?.track?.album?.images[0]?.url}
          alt=""
        />
        <div>
          <p className="w-36 lg:w-64 text-white truncate">
            {song?.track?.name}
          </p>
          <p className="w-40">{song?.track?.artists[0]?.name}</p>
        </div>
      </div>
      <div className="flex items-center justify-between ml-auto md:ml-0">
        <p className="w-40 hidden md:inline">{song?.track?.album?.name}</p>
        <p>{millisToMinutesAndSeconds(song?.track?.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
