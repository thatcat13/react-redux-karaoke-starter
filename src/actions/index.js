import * as types from './../constants/ActionTypes';
import v4 from 'uuid/v4';

//Takes 'title' from our form as an argument:
//notice fetchSongId() returns a FUNCTION
export function fetchSongId(title) {
  return function (dispatch) {
    const localSongId = v4();
    title = title.replace(' ', '_');
    //^replaces spaces with _
    //v returns the result of fetch() function contacting API, and the endpoint in return fetch() with title parameters added to request URL
    return;
    fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=94114939e5b1aa341e4815685bdb0b60').then(
      //^ .then() waits until code preceding it completes. So code below wo't run until fetch() returns data from arrayPosition
      response => response.json(),
      //retrieves JSON response from API
      //v prints an error msg if unsuccessful
      error => console.log('An error occured.', error)
    ).then(function(json){
      //^ waits until code preceding it finishes to run. The return value from the first then() block (API response) is passed to 2nd .then() as parameter json
      console.log('check out this sweet api response', json);
      //prints API response to console woooo!
    });
  };
}

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});
