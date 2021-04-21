'use strict';

//variables
let active = 1;
const Score = [0, 0];
let currentScore = 0;
let win = 0;

//Elements
let dice = document.querySelector(`#dice`);
let curScore1El = document.querySelector(`.current-1`);
let curScore2El = document.querySelector(`.current-2`);
let side1 = document.querySelector(`.side-1`);
let side2 = document.querySelector(`.side-2`);
let score1 = document.querySelector(`.score1`);
let score2 = document.querySelector(`.score2`);

const currentSet = (num) => document.querySelector(`.current-${active}`).textContent = num;
const totalScore = (num) => document.querySelector(`.score${active}`).textContent = num;
const switchActive = () => active == 1 ? active = 2 : active = 1;

const winner = function () {
    totalScore("Winner");
    win = 1;
    document.querySelector(`.side-${active}`).classList.add('win');
    document.querySelector('#ngame').classList.add('animate__animated', 'animate__pulse', 'animate__infinite');
    dice.classList.add('hide');


}

const shift = function () {
    //shift
    currentScore = 0;
    currentSet(0);
    switchActive();
    side1.classList.toggle(`active`);
    side2.classList.toggle(`active`);

}

const roll = function () {
    let rand = Math.trunc(Math.random() * 6) + 1;
    dice.src = `img/dice-${rand}.png`;
    if (rand != 1) {
        currentScore += rand;
        currentSet(currentScore);
    } else {
        shift();
    }
    dice.classList.remove('hide');
}


const hold = function () {
    Score[active - 1] += currentScore;
    if (Score[active - 1] >= 100) {
        winner();
    } else {
        totalScore(Score[active - 1]);
        shift();
    }



}

const newGame = function () {
    curScore1El.textContent = 0;
    curScore2El.textContent = 0;
    currentScore = 0;
    Score[0] = 0;
    Score[1] = 0;
    document.querySelector(`.side-${active}`).classList.remove('win');
    active = 1;
    side1.classList.add(`active`);
    side2.classList.remove(`active`);
    score1.textContent = 0;
    score2.textContent = 0;
    win = 0;
    document.querySelector('#ngame').classList.remove('animate__animated', 'animate__pulse', 'animate__infinite');
    dice.classList.add('hide');

}


document.querySelector('#rock-n-roll').addEventListener('click', function () {
    if (!win) {
        roll();
    }
});
document.querySelector('#hold-it-up').addEventListener('click', function () {
    if (!win) {
        hold();
    }
});
document.querySelector('#ngame').addEventListener('click', newGame);


