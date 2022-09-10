import { getDiceRolls } from "./utils.js"

// constructor to create a character object from one of the character array objects
export function Character(data){
    Object.assign(this,data)
    this.getDiceHTML = function(){
        return getDiceRolls(this.diceCount).map(function(num){
            return `<div class="dice">${num}</div>`
        }).join('')        
    }
    this.getCharacterHTML= function(){
        return `<div class="character-card">
          <div class="avatar-container">
            <h4 class="name">${this.name}</h4>
            <img class="avatar" src="${this.avatar}" alt="image of ${this.name} fantasy character">
            <p class="health">health: <span class="health-stat">${this.health}</span></p>
          </div>
          <div class="dice-container">${this.getDiceHTML()}</div>
        </div>`
    }
}