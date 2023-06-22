"use strict";

const btn_rollDice = document.querySelector(".btn_rollDice");
const btn_hold = document.querySelector(".btn_hold");
const btn_reset = document.querySelector(".btn_reset");
const message = document.querySelector(".tag1");
const Rules = document.querySelector(".tag2");
//event caller
btn_rollDice.addEventListener("click", randomNumber);
btn_hold.addEventListener("click", holdNumber);
message.addEventListener("click", messageBoxClose);
btn_reset.addEventListener("click", reset);
Rules.addEventListener("click", rulePopupClose);
let currentValue = 0;
let newCurrenValue;
let play_active_value = 0;
let score = [0, 0];

//hold button
function reset() {
  currentValue = 0;
  newCurrenValue;
  play_active_value = 0;
  score = [0, 0];

  btn_hold.addEventListener("click", holdNumber);
  btn_rollDice.addEventListener("click", randomNumber);
  document.querySelector(".messageBox").style.display = "none";
  document.querySelector("body").classList.remove("won");
  document.querySelector(".currentValue0").innerHTML = "00";
  document.querySelector(".currentValue1").innerHTML = "00";
  document.querySelector("#score0").innerHTML = "00";
  document.querySelector("#score1").innerHTML = "00";
  document.querySelector(`.player_0`).classList.add("play_active");
  document.querySelector(`.player_1`).classList.remove("play_active");
}
function holdNumber() {
  score[play_active_value] += currentValue;
  if (score[play_active_value] <= 50) {
    document
      .querySelector(`.player_${play_active_value}`)
      .classList.remove("play_active");
    currentValue = 0;
    document.querySelector(`#score${play_active_value}`).innerHTML =
      score[play_active_value];
    document.querySelector(`.currentValue${play_active_value}`).innerHTML =
      "00";
    play_active_value = play_active_value == 1 ? 0 : 1;
    document
      .querySelector(`.player_${play_active_value}`)
      .classList.add("play_active");
  } else {
    document.querySelector("body").classList.add("won");
    document.querySelector(`#score${play_active_value}`).innerHTML =
      score[play_active_value];
    //checking which player won for displaying
    const winner = play_active_value == 0 ? "Player 1" : "Player 2";
    document.querySelector(
      ".messageText"
    ).innerHTML = `Congradulations! <br>${winner} won the game.`;
    document.querySelector(".messageBox").style.display = "block";
    btn_hold.removeEventListener("click", holdNumber);
    btn_rollDice.removeEventListener("click", randomNumber);
  }
}
//popUp message
function messageBoxClose() {
  document.querySelector(".messageBox").style.display = "none";
}
//rule popup message
function rulePopupClose() {
  document.querySelector(".GameRules").style.display = "none";
}
//random number generating function
function randomNumber() {
  newCurrenValue = Math.floor(Math.random() * 6) + 1;
  document.querySelector(".imageDice").src = `image/dice-${newCurrenValue}.png`;
  currentValue += newCurrenValue;
  document.querySelector(`.currentValue${play_active_value}`).innerHTML =
    currentValue;

  //when dice roll one
  if (newCurrenValue == 1) {
    document
      .querySelector(`.player_${play_active_value}`)
      .classList.remove("play_active");
    score[play_active_value] = 0;
    currentValue = 0;
    document.querySelector(`#score${play_active_value}`).innerHTML =
      score[play_active_value];
    document.querySelector(`.currentValue${play_active_value}`).innerHTML =
      "00";
    play_active_value = play_active_value == 1 ? 0 : 1;
    document
      .querySelector(`.player_${play_active_value}`)
      .classList.add("play_active");
  }
}
