import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextLyric } from './../actions';

const SongDisplay = ({ dispatch, song }) => {
//'dispatch, song = props this component will receive; the {} is destructuring them from the larger props object; avoids having to do: props.song or props.dispatch'
  const { title, artist, songArray, arrayPosition, id } = song;
  //^more destructuring (know that song prop is an entire object bc mapStateToProps() is gathering all song details from Redux and assigning them the key 'song'; this gives us a single prop containing all the stuff, title, artist etc)
  const currentLine = songArray[arrayPosition];
  let action;
  //click event below dispatches actions to either advance lyrics 1 index or restart song
  return (
    <div>
      <h1>{title}</h1>
      <h4>{artist}</h4>
      <hr/>
      <div onClick={e => {
        e.preventDefault();
        if(!(arrayPosition === songArray.length - 1)) {
          dispatch(nextLyric(id));
        } else {
          dispatch(restartSong(id));
        }
      }}>
        <h1>
          {currentLine}
        </h1>
      </div>
    </div>
  );
};

SongDisplay.propTypes = {
  song: PropTypes.object,
  id: PropTypes.number,
  title: PropTypes.string,
  artist: PropTypes.string,
  songArray: PropTypes.array,
  arrayPosition: PropTypes.number,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  const song = state.songsById[state.currentSongId];
  const songInfo = {
    id: song.songId,
    artist: song.artist,
    title: song.title,
    songArray: song.songArray,
    arrayPosition: song.arrayPosition
  };
  return {
    song: songInfo
  };
};

export default connect(mapStateToProps)(SongDisplay);
