function getUrlHashParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\#&]' + name + '=([^&#]*)');
  var results = regex.exec(location.hash);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function playPreview(previewUrl) {
  const player = $('#player')[0];
  player.src =  previewUrl;
  player.play();
}

function parseSongs(responseText) {
  // https://beta.developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/
  const songs = JSON.parse(responseText).items;

  return songs.map(song => ({
    songName: song.track.name,
    audio: song.track.preview_url,
    image: song.track.album.images[0].url,
  }));
}

function requestSongs(accessToken, onSongs) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function () {
    onSongs(parseSongs(this.responseText));
  });
  oReq.open("GET", "https://api.spotify.com/v1/me/tracks");
  oReq.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  oReq.setRequestHeader('Content-Type', 'application/json');
  oReq.send();
}

function login() {
  const clientId = '7d417cf680904d6aa8c970d937a5daf5';
  const redirectUri = window.location.href;
  const spotifyAuthorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=user-library-read`;
  window.location = spotifyAuthorizeUrl;
}

function getSpotifySongs(onSongs) {
  const accessToken = getUrlHashParameter('access_token');
  if (accessToken) {
    requestSongs(accessToken, onSongs);
    $('body').append('<audio id="player" preload="auto"></audio>');
  } else {
    const loginButton = $('<button />').text('Login to Spotify').click(login);
    $('body').append(loginButton);
  }
}
