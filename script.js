import { monsters } from "./monsters.js";

const autocomplete = document.getElementById("monster-guess");
const resultsHTML = document.getElementById("results");
autocomplete.oninput = function () {
  let results = [];
  const userInput = this.value;
  resultsHTML.innerHTML = "";
  if (userInput.length > 2) {
    results = getResults(userInput);
    resultsHTML.style.display = "block";
    for (let i = 0; i < results.length; i++) {
      resultsHTML.innerHTML += "<li>" + results[i] + "</li>" + "<br>";
    }
  }
};
function getResults(input) {
  const results = [];
  for (let i = 0; i < monsters.length; i++) {
    let stringifiedResult = `${monsters[i].name.toLowerCase()} ${monsters[i].type.toLowerCase()} ${monsters[i].size.toLowerCase()} ${monsters[i].alignment.toLowerCase()}`;
    if (stringifiedResult.includes(input.toLowerCase())
    ) {
      results.push(
        `${monsters[i].name}: ${monsters[i].type}, ${monsters[i].hitpoints}hp, ${monsters[i].size}, ${monsters[i].alignment}`
      );
    }
  }
  return results;
}
resultsHTML.onclick = function (event) {
  const valueArr = event.target.innerText.split(":");
  const setValue = valueArr[0];
  autocomplete.value = setValue;
  this.innerHTML = "";
};

let guesses=7;
function createGuesses() {
const guessPara=document.querySelector("#guesses");
guessPara.innerHTML=`${guesses} guesses left`
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function findNewMonster(monsters) {
  let randomNum = getRandomInt(1086);
  let newMonster = monsters[randomNum];
  console.log(newMonster);
  return newMonster;
}

const newMonster = findNewMonster(monsters);

function checkType(guessMonster) {
  let output = "";
  if (guessMonster.type === newMonster.type) {
    output=`<td>${guessMonster.type} is correct!</td>`;
  } else if(guessMonster.type !== newMonster.type) {
    output=`<td><s>${guessMonster.type}</s></td>`;
  }
  return output;
}
function checkHP(guessMonster) {
  let output = "";
  if (guessMonster.hitpoints === newMonster.hitpoints) {
    output = `<td>${guessMonster.hitpoints} is correct!</td>`;
  } else if (guessMonster.hitpoints > newMonster.hitpoints) {
    output = `<td>${guessMonster.hitpoints} is too high!</td>`;
  } else if (guessMonster.hitpoints < newMonster.hitpoints) {
    output = `<td>${guessMonster.hitpoints} is too low!</td>`;
  }

  return output;
}
function checkSize(guessMonster) {
  const sizesArr = ["Tiny", "Small", "Medium", "Large", "Huge", "Gargantuan"];
  let output=""
  const guessIndex = sizesArr.indexOf(guessMonster.size)
  const correctIndex=sizesArr.indexOf(newMonster.size)
  if (guessIndex === correctIndex) {
    output = `<td>${guessMonster.size} is correct!</td>`;
  } else if (guessIndex > correctIndex) {
    output = `<td>${guessMonster.size} is too big!</td>`;
  } else if (guessIndex < correctIndex) {
    output = `<td>${guessMonster.size} is too small!</td>`;
  }
  return output;
}
function checkAlignment(guessMonster) {
  let output = "";
  if (guessMonster.alignment === newMonster.alignment) {
    output = `<td>${guessMonster.alignment} is correct!</td>`;
  } else if (guessMonster.alignment !== newMonster.alignment) {
    output = `<td><s>${guessMonster.alignment}</s></td>`;
  } 
  return output;
}

function checkGuess(guess) {
  guesses--;
  createGuesses();
  let correctName = newMonster.name;
  let guessMonster = monsters.find((monster) => monster.name === guess);
  let guessName = guessMonster.name;
  if (guessName === correctName) {
    alert("You got it!! Click the New Game button to try again!");
  } else if (guessName !== correctName && guesses!==0) {
    const rowType = checkType(guessMonster);
    const rowHP = checkHP(guessMonster);
    const rowSize = checkSize(guessMonster);
    const rowAlignment = checkAlignment(guessMonster);
    let tableRow=document.createElement("tr")
    const guessRow = `<td>${guessName}</td>${rowType}${rowHP}${rowSize}${rowAlignment}`;
    tableRow.innerHTML=guessRow
    const tableBody = document.querySelector("#guess-body");
    tableBody.appendChild(tableRow);
    alert("Try Again...");
  } else if (guessName !== correctName && guesses==0) {
    alert(`You didn't get it this time! The correct answer was ${correctName}. Click New Game to try again!`)
    const guessButton=document.querySelector("#guess-button")
    guessButton.disabled=true;
  }
}

function validateExists(value) {
  return value && value.trim();
}

function validateForm(formData) {
  // Check if name was entered
  const element = document.querySelector(".error");
  // Check if name was entered
  if (!validateExists(formData.get("monster-guess"))) {
    element.style.display = "block";
  } else if (validateExists(formData.get("monster-guess"))) {
    element.style.display = "none";
  }
}

const submitHandler = (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const errors = validateForm(formData);
  checkGuess(formData.get("monster-guess"));
  form.reset();
};

const main = () => {
  // get the form element
  const form = document.querySelector("#guessForm");

  // attach the submit handler
  form.addEventListener("submit", submitHandler);
  newMonster;
  createGuesses()
};

window.addEventListener("DOMContentLoaded", main);
