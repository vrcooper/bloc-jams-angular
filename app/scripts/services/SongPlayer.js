(function() {
    function SongPlayer(Fixtures) {
        /**
        * @desc creates song player object
        * @type {object}
        */
        var SongPlayer = {};
        /**
        * @desc injects Fixtures service and uses getAlbum to store album info
        *@type {object}
        */
        var currentAlbum = Fixtures.getAlbum();
        
        /**
        * @function getSongIndex
        * @desc gets index of currently playing song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };
        /**
        * @desc Buzz object audio file
        * @type {object}
        */
        var currentBuzzObject = null;
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(song);
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        /**
        * @function playSong
        * @desc Plays currently playing song 
        * @param {Object} song
        */
        var playSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.play();
                song.playing = true;
            }
        };
        
        /**
        * @function stopSong
        * @desc Stops currently playing song
        * @param {object} song
        */
        var stopSong = function(song) {
            if(currentBuzzObject) {
                currentBuzzObject.stop();
                song.playing = null;
            }
        };
        /**
        * @desc sets current song to null value
        * @type {object}
        */
        SongPlayer.currentSong = null;
        /**
        * @function SongPlayer.play
        * @desc Sets or plays song if song is not equal to currently playing song and plays song if currently playing song is paused
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
            
        };
        /**
        * @function SongPlayer.pause
        * @desc Pauses currently playing song
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        /**
        * @function SongPlayer.previous
        * @desc gets previous song by getting index of currently playing song and decreasing by one
        * @param {object} song
        */
        SongPlayer.previous = function() {
            song = song || SongPlayer.currentSong;
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
                stopSong(song);
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        /**
        * @function SongPlayer.next
        * @desc gets next song by getting index of currently playing song and increasing by one
        * @param {object} song
        */
        SongPlayer.next = function() {
            song = song || SongPlayer.currentSong;
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex > currentAlbum.songs.length) {
                stopSong(song);
                //currentBuzzObject.stop();
                //SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();