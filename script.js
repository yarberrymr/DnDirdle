import { get } from 'axios';
function checkGuess() {
    const guess = document.getElementById("monster-guess").value;
    alert(guess);
}
function getMonster () {
    get("https://api.open5e.com/monsters/").then(resp => {

    console.log(resp.data.results[5]);
});
}
getMonster()