# scripted-spotify-playlist

![alt text](https://raw.githubusercontent.com/juan-andres/scripted-spotify-playlist/master/songs_preview.jpg "Spotify Create Account")

[Demo!!!](https://juan-andres.github.io/scripted-spotify-playlist/)

If you don't have an Spotify account yet, you can create one for free

## Using the script
You need to add 2 scripts

<script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
<script src="https://juan-andres.github.io/scripted-spotify-playlist/getSpotifySongs.js"></script>

Then, in your javascript you can use the `getSpotifySongs` function like in the example:

```javascript
$(document).ready(function(){
  function loadSongsExample(songs) {
    // A song object looks like this
    // {
    //   name: 'hall of fame',
    //   image: 'http://whereismyimage.com',
    //   audio: 'http://linktoanmp3_song.com',
    // }
    for (var i = 0; i < songs.length; i++) {
      const song = songs[i];
      $('#spotify_songs').append(
        '<div class="songWrapper">' +
        '<img class="song" onclick="playPreview(\'' + song.audio + '\')" src="' + song.image + '" />' +
        '<span>' + song.songName + '</span>' +
        '</div>'
      );
    }
  }

  getSpotifySongs(loadSongsExample);
```
