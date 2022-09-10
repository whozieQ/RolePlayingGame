import { getDiceRolls, getDicePlaceholderHTML } from "./utils.js"

// constructor to create a character object from one of the character array objects
export function Character(data){
    Object.assign(this,data)
    this.alive = true
    this.currentDice = new Array(this.diceCount).fill(0)

    this.getHealthHTML = function(damage){
        //updates health by calculating damage done by supplied set of dice rolled
        this.health -= damage.reduce(function(total,currentElement){
            return total + currentElement
        })

        if (this.health <=0){
            this.health = 0
            this.alive = false
        }
        return  `<p class="health">health: <span class="health-stat">${this.health}</span></p>`
    }

    this.getDiceHTML = function(){
        // updates the dice HTML by rolling dice and showing result
        this.currentDice = getDiceRolls(this.diceCount)

        return this.currentDice.map(function(num){
            return `<div class="dice">${num}</div>`
        }).join('')        
    }
    this.getCharacterHTML= function(){
        // sets the initial HTML for the character card
        const {name, avatar, diceCount} = this
        return `<div id="${this.type}">
          <div class="character-card">
            <div class="avatar-container">
              <h4 class="name">${name}</h4>
              <img class="avatar" src="${avatar}" alt="image of ${name} fantasy character">
              ${this.getHealthHTML([0])}
            </div>
          <div class="dice-container">${getDicePlaceholderHTML(diceCount)}</div>
        </div></div>`
    }
}