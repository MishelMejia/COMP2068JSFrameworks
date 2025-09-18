const prompt = require('prompt-sync')({ sigint: true });

const userSelection = prompt('Choose ROCK, PAPER or SCISSORS: ').trim().toUpperCase();

const r = Math.random();
let computerSelection = '';
if (r <= 0.34) computerSelection = 'PAPER';
else if (r <= 0.67) computerSelection = 'SCISSORS';
else computerSelection = 'ROCK';

console.log(`User chose: ${userSelection}`);
console.log(`Computer chose: ${computerSelection}`);

if (userSelection === computerSelection) {
  console.log("It's a tie");
} else if (
  (userSelection === 'ROCK' && computerSelection === 'SCISSORS') ||
  (userSelection === 'PAPER' && computerSelection === 'ROCK') ||
  (userSelection === 'SCISSORS' && computerSelection === 'PAPER')
) {
  console.log('User Wins');
} else {
  console.log('Computer Wins');
}

