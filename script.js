document.getElementById('startButton').addEventListener('click', toggleReading);
const restartButton = document.createElement('button');
restartButton.textContent = 'Restart';
restartButton.id = 'restartButton';
restartButton.style.display = 'none';
document.getElementById('app').appendChild(restartButton); 
restartButton.addEventListener('click', restartReading);

const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
leftArrow.addEventListener('click', () => changeWord(-1));
rightArrow.addEventListener('click', () => changeWord(1));

let words = [];
let index = 0;
let interval;
let reading = false;

function loadWords() {
    const text = document.getElementById('inputText').value;
    words = text.split(/\s+/);
}

function displayNextWord() {
    if (index < words.length) {
        document.getElementById('wordContainer').textContent = words[index];
    } else {
        stopReading(true);
    }
}


function updateSpeed() {
    if (reading) {
        clearInterval(interval);
        interval = setInterval(() => {
            if (index < words.length - 1) {
                index++; 
                displayNextWord();
            } else {
                displayNextWord(); 
                stopReading(true); 
            }
        }, 60000 / parseInt(document.getElementById('speedRange').value));
    }
}




document.getElementById('speedRange').addEventListener('input', updateSpeed);


function startReading() {
    if (!reading && words.length > 0) {
        reading = true;
        document.getElementById('startButton').textContent = 'Stop Reading';
        leftArrow.style.display = 'none';
        rightArrow.style.display = 'none';
        restartButton.style.display = 'none';

        displayNextWord(); 

        interval = setInterval(() => {
            if (index < words.length - 1) {
                index++; 
                displayNextWord();
            } else {
                clearInterval(interval); 
                stopReading(true); 
            }
        }, 60000 / parseInt(document.getElementById('speedRange').value));
    }
}



function stopReading(endOfText = false) {
    clearInterval(interval);
    reading = false;
    document.getElementById('startButton').textContent = 'Start Reading';
    leftArrow.style.display = 'inline';
    rightArrow.style.display = 'inline';
    restartButton.style.display = 'inline'; 
    if (endOfText) {
        index = 0;
    }
}

function toggleReading() {
    if (reading) {
        stopReading();
    } else {
        if (words.length === 0 || index >= words.length) {
            loadWords();
        }
        startReading();
    }
}

function restartReading() {
    loadWords(); 
    index = 0; 
    startReading();
}



function changeWord(direction) {
    if (!reading && index + direction >= 0 && index + direction < words.length) {
        index += direction;
        displayNextWord();
    }
}



document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeWord(-1);
    } else if (event.key === 'ArrowRight') {
        changeWord(1);
    }
});