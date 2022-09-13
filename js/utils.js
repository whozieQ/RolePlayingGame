function getDiceRolls(numDice){
    // roll X number of 6-sided die
    // return an array listing each die that was rolled
    return new Array(numDice).fill(0).map(()=> Math.floor(Math.random()*6) + 1)  
}
function getDicePlaceholderHTML (numDice){
    return new Array(numDice).fill(`<div class="placeholder-dice"></div>`).join('')
}
export {getDiceRolls, getDicePlaceholderHTML}

