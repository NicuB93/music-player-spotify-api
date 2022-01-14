import {
  playlistState,
  likedPlaylistState,
  isClickedlikedPlaylistState,
} from 'atoms/playlistAton';
import { useRecoilValue } from 'recoil';
import Song from './Song';

const Songs = () => {
  const playlist = useRecoilValue(playlistState);
  const likedPlaylist = useRecoilValue(likedPlaylistState);
  const isClickedlikedPlaylist = useRecoilValue(isClickedlikedPlaylistState);

  return (
    <div className="px-8 flex flex-col space-y-1 pb-28 text-white">
      {!isClickedlikedPlaylist
        ? likedPlaylist.items.map((song, i: number) => (
            <Song key={song.track.id} order={i} song={song} />
          ))
        : playlist?.tracks.items.map(
            (song: SpotifyApi.PlaylistTrackObject, i: number) => (
              <Song key={song.track.id} order={i} song={song} />
            )
          )}
    </div>
  );
};

export default Songs;
