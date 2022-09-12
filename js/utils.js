function getDiceRolls(numDice){
    // roll X number of 6-sided die
    // return an array listing each die that was rolled
    return new Array(numDice).fill(0).map(()=> Math.floor(Math.random()*6) + 1)  
}
function getDicePlaceholderHTML (numDice){
    return new Array(numDice).fill(`<div class="placeholder-dice"></div>`).join('')
}
function setButtons(showButton){
    document.getElementById("attack-button").style.display = "none"
    document.getElementById("next-button").style.display = "none"
    document.getElementById("reset-button").style.display = "none"
    document.getElementById(`${showButton}-button`).style.display = "initial"
    document.getElementById(`${showButton}-button`).style.visibility = "visible"
}
function toggleAttackButton(){
    const btn = document.getElementById("attack-button")
    btn.style.visibility === "hidden" ? btn.style.visibility = "visible" : btn.style.visibility = "hidden"
}
export {getDiceRolls,getDicePlaceholderHTML,setButtons,toggleAttackButton}

