'use strict';
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0'); // when we select id we use #
const score1El = document.getElementById('score--1'); //getElementById is the same
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diseEl = document.querySelector('.dice'); //
// start condision
let scores = [0, 0];
let activePlayer = 0;
let currentScore = 0;
let playing = true;

const init = function () {
  diseEl.classList.add('hidden'); //the dice is hidden
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player0EL.classList.add('player--active'); //the active player is player 0
  player1EL.classList.remove('player--active'); //player  1 is not the active player.
  playing = true;
};
init();

const switchUser = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; //the cournt score is back to 0
  activePlayer = activePlayer === 0 ? 1 : 0; //change the number of the player
  currentScore = 0; // curret score is set to 0
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; // make a random number
    diseEl.src = `dice-${dice}.png`; // chang the pic of the dice
    diseEl.classList.remove('hidden'); //the hidden is remove so the dice is show
    if (dice != 1) {
      //if the dice is not one
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      switchUser();
    }
  }
});
btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore; // the score is add to the player
    document.getElementById(`score--${activePlayer}`).textContent = // the score value is show
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diseEl.classList.add('hidden');
      // check if the player is won
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchUser();
    }
  }
  // if press hold butten
});
btnNew.addEventListener('click', init);
