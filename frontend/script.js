let currentTrack = 0;
const songs = [
    "song1.mp3",
    "song2.mp3",
    "song3.mp3"
];

const audioPlayer = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const songTitle = document.getElementById('song-title');
const playPauseButton = document.getElementById('play-pause');
const prevTrackButton = document.getElementById('prev-track');
const nextTrackButton = document.getElementById('next-track');
const playerProgress = document.getElementById('player-progress');

// Инициализация Telegram Web App SDK
Telegram.WebApp.ready();

function loadSong(trackIndex) {
    const song = songs[trackIndex];
    audioSource.src = `https://5f35-94-181-67-166.ngrok-free.app/songs/${song}`;
    songTitle.textContent = song;
    audioPlayer.load();
    audioPlayer.play();
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseButton.textContent = 'Пауза';
    } else {
        audioPlayer.pause();
        playPauseButton.textContent = 'Продолжить';
    }
}

function prevTrack() {
    currentTrack = (currentTrack > 0) ? currentTrack - 1 : songs.length - 1;
    loadSong(currentTrack);
}

function nextTrack() {
    currentTrack = (currentTrack + 1) % songs.length;
    loadSong(currentTrack);
}

audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    playerProgress.value = progress;
});

playerProgress.addEventListener('input', () => {
    const progress = playerProgress.value * audioPlayer.duration / 100;
    audioPlayer.currentTime = progress;
});

// Обработка кнопок
playPauseButton.addEventListener('click', togglePlayPause);
prevTrackButton.addEventListener('click', prevTrack);
nextTrackButton.addEventListener('click', nextTrack);

// Инициализация плеера
loadSong(currentTrack);
