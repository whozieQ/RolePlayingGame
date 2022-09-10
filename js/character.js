import { getDiceRolls, getDicePlaceholderHTML } from "./utils.js"

// constructor to create a character object from one of the character array objects
export function Character(data){
    // transfer all properties in data object into matching properties in this
    Object.assign(this,data)
    // add a new property indicating if the player is still alive
    this.alive = true
    // add a new property to store current health, starting with max health
    this.health = this.maxHealth
    this.currentDice = new Array(this.diceCount).fill(0)

    this.getHealthHTML = function(damage){
        //updates health by calculating damage done by supplied set of dice rolled
        this.health -= damage.reduce((total,currentElement) => total + currentElement)

        if (this.health <=0){
            this.health = 0
            this.alive = false
        }
        return  `<p class="health">health: <span class="health-stat">${this.health}</span></p>`
    }

    this.getHealthBarHTML = function(){
        // uses health & max health to display a dynamic health bar
        const percent = (this.health/this.maxHealth)*100
        return `<div class="health-bar-inner ${percent <=25?"danger":""}" 
                    style="width: ${percent}%;">
                </div>`

    }

    this.getDiceHTML = function(){
        // updates the dice HTML by rolling dice and showing result
        this.currentDice = getDiceRolls(this.diceCount)
        return this.currentDice.map(num=>`<div class="dice">${num}</div>`).join('')        
    }

    this.getCharacterHTML= function(){
        // sets the initial HTML for the character card
        const {name, avatar, diceCount} = this
        return `<div class="avatar-container">
                    <h4 class="name">${name}</h4>
                    <img class="avatar" src="${avatar}" alt="image of ${name} fantasy character">
                    ${this.getHealthHTML([0])}
                    <div class="health-bar-outer">
                        ${this.getHealthBarHTML()}
                    </div>
                </div>
                <div class="dice-container">${getDicePlaceholderHTML(diceCount)}</div>`
}
}