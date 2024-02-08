document.getElementById('startButton').addEventListener('click', toggleReading);
const restartButton = document.createElement('button');
restartButton.textContent = 'Restart';
restartButton.id = 'restartButton';
restartButton.style.display = 'none'; // Hide restart button initially
document.getElementById('app').appendChild(restartButton); // Add restart button to the app
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
                index++; // Move to the next word
                displayNextWord();
            } else {
                displayNextWord(); // Display the last word
                stopReading(true); // Optionally stop if at the end
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

        displayNextWord(); // Display the first word immediately

        // Start the interval with the next word
        interval = setInterval(() => {
            if (index < words.length - 1) {
                index++; // Prepare to display the next word
                displayNextWord();
            } else {
                clearInterval(interval); // Clear the interval at the end of the text
                stopReading(true); // Optionally handle the end of reading
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
    restartButton.style.display = 'inline'; // Show restart button when reading is stopped
    if (endOfText) {
        index = 0;
    }
}

function toggleReading() {
    if (reading) {
        stopReading();
    } else {
        if (words.length === 0 || index >= words.length) {
            loadWords(); // Load words if not yet loaded or if at the end
        }
        startReading();
    }
}

function restartReading() {
    loadWords(); // Reload the words from the input text
    index = 0; // Reset index to start from the beginning
    startReading();
}



function changeWord(direction) {
    if (!reading && index + direction >= 0 && index + direction < words.length) {
        index += direction;
        displayNextWord();
    }
}



// Listen for arrow key presses to navigate words
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        changeWord(-1);
    } else if (event.key === 'ArrowRight') {
        changeWord(1);
    }
});