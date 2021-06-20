// Variables
const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
let missed = 0;
const startButton = document.querySelector('.btn__reset');
const overlay = document.querySelector('#overlay');


//'Start Game' button
startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
});

//Array of phrases
const phrases = [
    'home is where the heart is',
    'pain is temporary',
    'carry on my wayward son',
    'the show must go on',
    'king of the jungle'
];

//Function to split random phrase from array
function getRandomPhraseAsArray(arr) {
    const randomNumber = Math.floor(Math.random() * arr.length);
    const randomPhrase = arr[randomNumber];
    const splitPhraseArray = randomPhrase.split('');
    return splitPhraseArray;
}

//Stored split array in variable
const phraseArray = getRandomPhraseAsArray(phrases);

//Used split array variable to project phrase to game board
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        const li = document.createElement('li');
        const ul = document.getElementById('phrase');
        let character = arr[i];
        li.textContent = character;

        if(li.textContent !== ' ') {
            li.className = "letter";
        }   else {
            li.className = "space";
        }

        ul.appendChild(li);
    }
}

//checks if letters match the phrase and changes class if they match
function checkLetter(button) {
    const letters = document.querySelectorAll('#phrase li');
    let match = null;
    const chosenLetter = button.textContent;
    for (let i = 0; i < letters.length; i += 1) {
        const li = letters[i];
        if (chosenLetter === li.textContent.toLowerCase()) {
            letters[i].className = "show letter";
            match = chosenLetter;
        }
    }
    return match;
}


//filters out clicks that aren't on buttons
//changes buttons once selected so they can't be clicked again
//adjusts scoreboard if wrong letter chosen
qwerty.addEventListener('click', (e) => {
    let button = e.target;
    if(button.className === "chosen" || button.parentNode.className !== "keyrow") {
        return null;
    }

        button.className = "chosen"
        button.disabled = true;
        let check = checkLetter(button);
        const heart = document.querySelectorAll('.tries img');

        if(check === null) {
            heart[missed].src = 'images/lostHeart.png';
            missed += 1;
        }
    checkWin();
});

//function to display win/lose screens based on results
function checkWin() {
    let letterClass = document.querySelectorAll('.letter');
    let showClass = document.querySelectorAll('.show');
    let title = document.querySelector('.title');
    if(letterClass.length === showClass.length) {
        overlay.className = 'start' + ' win';
        title.textContent = 'Congratulations! You win!';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play Again';

    } else if (missed > 4) {
        overlay.className = 'start' + ' lose';
        title.textContent = 'Sorry, You lose.';
        overlay.style.display = 'flex';
        startButton.textContent = 'Play Again';
    }
}

//Resets buttons back to original state
function resetKeyboard() {
    const keys = document.getElementsByTagName('button');
    for(let i = 0; i < keys.length; i += 1) {
        keys[i].className = '';
        keys[i].disabled = false;
    }
}

//Refills life bar
function resetLives() {
    missed = 0;
    const hearts = document.querySelectorAll('.tries');
    for(let i = 0; i < hearts.length; i += 1) {
        const heartImg = hearts[i].firstElementChild;
        heartImg.src = 'images/liveHeart.png';
    }
}

//clears out phrase from previous game
function clearPhrase() {
    const previousPhrase = phrase.querySelectorAll('li');
    for(let i = 0; i < previousPhrase.length; i += 1) {
        let ul = previousPhrase[i].parentNode;
        ul.removeChild(ul.firstElementChild);
    }
}

//Combines all 'reset' functions into the 'Play Again' button event listener
startButton.addEventListener('click', () => {
    if (startButton.textContent === 'Play Again') {
        resetKeyboard();
        resetLives();
        clearPhrase();
        overlay.style.display = 'none';
        const phraseArray = getRandomPhraseAsArray(phrases);
        addPhraseToDisplay(phraseArray);
    }
});

    





