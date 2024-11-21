// File: Project.js

// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {
    // Handle sidebar navigation hover effects
    const navOptions = document.querySelectorAll('.nav-option');
    navOptions.forEach(option => {
        option.addEventListener('mouseover', () => option.style.opacity = "1");
        option.addEventListener('mouseout', () => option.style.opacity = "0.7");
    });

    // Handle "Create playlist" and "Browse podcasts" buttons
    const playlistButtons = document.querySelectorAll('.box .badge');
    playlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            const message = button.innerText.includes('playlist') ? 
                "Feature to create playlists coming soon!" : 
                "Feature to browse podcasts coming soon!";
            alert(message);
        });
    });

    // Sticky navigation scroll behavior
    const stickyNav = document.querySelector('.sticky-nav');
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            stickyNav.style.opacity = "0.5"; // Dim when scrolling down
        } else {
            stickyNav.style.opacity = "1";   // Full opacity when scrolling up
        }
        lastScrollY = window.scrollY;
    });

    // Music player functionality
    const progressBar = document.querySelector('.progress-bar');
    const currTimeSpan = document.querySelector('.curr-time');
    const totTimeSpan = document.querySelector('.tot-time');
    const playPauseIcon = document.querySelector('.player-control-icon:nth-child(3)');
    const audio = new Audio('./assets/song.mp3'); // Replace with your audio file path
    let isPlaying = false;

    // Total duration for the song (example value, update dynamically if needed)
    let totalSeconds = 213; // Default total time in seconds (3:33)

    // Format seconds into mm:ss format
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // Set initial total time
    totTimeSpan.innerText = formatTime(totalSeconds);

    // Update playback bar on input change
    progressBar.addEventListener('input', (e) => {
        const currentTime = Math.floor((e.target.value / 100) * totalSeconds);
        currTimeSpan.innerText = formatTime(currentTime);
        audio.currentTime = currentTime; // Sync audio with slider
    });

    // Handle play/pause click
    playPauseIcon.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audio.play();
            playPauseIcon.src = './assets/pause_icon.png'; // Replace with your pause icon
        } else {
            audio.pause();
            playPauseIcon.src = './assets/player_icon3.png'; // Replace with your play icon
        }
    });

    // Sync playback bar with audio playback
    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const progress = (currentTime / totalSeconds) * 100;
        progressBar.value = progress;
        currTimeSpan.innerText = formatTime(Math.floor(currentTime));
    });

    // Update total time when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        totalSeconds = Math.floor(audio.duration);
        totTimeSpan.innerText = formatTime(totalSeconds);
    });

    // Add additional functionality to enhance experience (optional)
    console.log('Spotify Web Player is ready!');
});
