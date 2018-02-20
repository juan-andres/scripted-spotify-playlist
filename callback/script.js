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

function loadSongs() {
  // https://beta.developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/
  const songs = JSON.parse(this.responseText).items;

  for (var i = 0; i < songs.length; i++) {
    const song = songs[i];
    $('#songs').append(
      '<div class="songWrapper">' +
      '<img class="song" onclick="playPreview(\'' + song.track.preview_url + '\')" src="' + song.track.album.images[0].url + '" />' +
      '<span>' + song.track.name + '</span>' +
      '</div>'
    );
  }
}

function requestSongs(accessToken) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", loadSongs);
  oReq.open("GET", "https://api.spotify.com/v1/me/tracks");
  oReq.setRequestHeader('Authorization', 'Bearer ' + accessToken);
  oReq.setRequestHeader('Content-Type', 'application/json');
  oReq.send();
}

$(document).ready(function(){
  const accessToken = getUrlHashParameter('access_token');
  requestSongs(accessToken);
});
