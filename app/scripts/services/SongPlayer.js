(function() {
    function SongPlayer() {
        /**
        * @desc creates song player object
        * @type {object}
        */
        var SongPlayer = {};
        /**
        * @desc sets current song to null value
        * @type {object}
        */
        var currentSong = null;
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
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
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
        * @function SongPlayer.play
        * @desc Sets or plays song if song is not equal to currently playing song and plays song if currently playing song is paused
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();