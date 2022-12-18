import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

if (localStorage.length !== 0) {
    player.setCurrentTime(JSON.parse(localStorage.getItem(STORAGE_KEY)).seconds)
    .catch(function (error) {
        switch (error.name) {
            case 'RangeError':
                break;
            default:
                break;
        }
    });
} 