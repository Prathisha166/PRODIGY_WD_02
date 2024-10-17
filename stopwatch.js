let startTime, updatedTime, difference, tInterval;
let running = false;
const lapList = document.getElementById('lapList');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);
document.getElementById('save').addEventListener('click', saveLaps);
document.getElementById('clearLaps').addEventListener('click', clearLaps);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10); // Update every 10 milliseconds
        running = true;
    }
}

function stopTimer() {
    clearInterval(tInterval);
    running = false;
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    document.getElementById('display').textContent = '00:00.00'; // Reset display
    lapList.innerHTML = '';
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const formattedTime = formatTime(difference);
    document.getElementById('display').textContent = formattedTime;
}

function formatTime(time) {
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10); // Calculate milliseconds for the display
    return `${formatDigit(minutes)}:${formatDigit(seconds)}.${formatDigit(milliseconds)}`;
}

function formatDigit(digit) {
    return digit < 10 ? '0' + digit : digit;
}

function recordLap() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapList.appendChild(lapItem);
    }
}

function saveLaps() {
    const laps = Array.from(lapList.children).map(li => li.textContent);
    localStorage.setItem('laps', JSON.stringify(laps));
    alert('Laps saved!');
}

function clearLaps() {
    lapList.innerHTML = '';
    localStorage.removeItem('laps');
    alert('All laps cleared!');
}

// Load saved laps on page load
window.onload = function() {
    const savedLaps = JSON.parse(localStorage.getItem('laps'));
    if (savedLaps) {
        savedLaps.forEach(lap => {
            const lapItem = document.createElement('li');
            lapItem.textContent = lap;
            lapList.appendChild(lapItem);
        });
    }
};
