function getDiceRolls(numDice){
    // roll X number of 6-sided die
    // return an array listing each die that was rolled
    return new Array(numDice).fill(0).map(function(){
        return Math.floor(Math.random()*6) + 1
    })  

}
export {getDiceRolls}

