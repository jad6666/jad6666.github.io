const outputEl = document.querySelector('.terminal-output');
const userInputEl = document.querySelector('.user-input');
const cursorEl = document.querySelector('.cursor');

let currentCommand = 'start';
let dots = '...';

function displayOutput(text) {
  outputEl.textContent += text + '\n';
  outputEl.scrollTop = outputEl.scrollHeight; 
}

function blinkCursor() {
  cursorEl.classList.toggle('hidden');
}

function handleInput(userInput) {
  userInput = userInput.trim().toLowerCase();
  displayOutput(`> ${userInput}`); 

  switch (currentCommand) {
    case 'start': 
      handleInitialInput(userInput);
      break;
    case 'about':
      if (userInput === '0') {
        currentCommand = 'start';
        displayInitialPrompt(); 
      } else {
        displayOutput('Type "0" to go back.');
      }
      break;
    case 'game':
      if (userInput === '0') {
        currentCommand = 'start';
        displayInitialPrompt(); 
      } else {
        handleGameInput(userInput); 
      }
      break;
    default: 
      displayOutput('Error: Something went wrong.'); 
  }

  userInputEl.value = ''; 
}

function displayInitialPrompt() {
  displayOutput('Welcome to my Eagle Terminal!');
  displayOutput('Choose a command:');
  displayOutput('  1. About Me');
  displayOutput('  2. Play Guess the Number');
}

function handleInitialInput(userInput) {
  if (userInput === '1') {
    currentCommand = 'about';
    displayAboutMe();
  } else if (userInput === '2') {
    currentCommand = 'game';
    startGame();
  } else {
    displayOutput('Invalid command. Please enter 1, 2, or 0.');
  }
}

function displayAboutMe() {
  displayOutput('--- About Me ---');
  displayOutput('Name: Jad M');
  displayOutput('Hobbies: Reading, Football, Law, Coding');
  displayOutput('Birthday: December 2, 2006');
  displayOutput('Coding experience: Trying 😔 ' + dots); 
  updateDots(); 
}

function updateDots() {
  clearInterval(dotsInterval); 
  dotsInterval = setInterval(() => {
    if (dots.length === 1) {
      dots += '.';
    } else { 
      dots = dots.slice(0, -1);
    }
    displayAboutMe(); 
  }, 500); 
}

function startGame() {
  displayOutput('--- Guess the Number ---');
  let score = 0;
  let attempts = 0;

  while (attempts < 5) {
    displayOutput(`Attempt ${attempts + 1}/5`);

    const userNumber = prompt('Choose a number from 1 to 10:');

    if (userNumber === null) {
      break;  
    } 

    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (userNumber == randomNumber) {
      score++;
      displayOutput('Correct! 🎉');
    } else {
      displayOutput(`Incorrect. It was ${randomNumber} 😞`);
    }

    attempts++;
  }

  displayOutput(`Your final score is ${score}`);
}

// Event Listener
userInputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleInput(userInputEl.value);
  }
});

setInterval(blinkCursor, 500); 

//  display
displayInitialPrompt();
