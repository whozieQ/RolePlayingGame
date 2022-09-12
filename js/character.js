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

    this.setHealth = function(damage){
        const container = document.querySelector(`#${this.type} .health-stat`)
        const avatar = document.querySelector(`#${this.type} .avatar`)
        //updates health by calculating damage done by supplied set of dice rolled
        this.health -= damage.reduce((total,currentElement) => total + currentElement)

        if (this.health <=0){
            this.health = 0
            this.alive = false
            avatar.style.backgroundBlendMode = "darken"
        }
        container.textContent = this.health
        this.setHealthBar()
    }

    this.setHealthBar = function(){
        const container = document.querySelector(`#${this.type} .health-bar-inner`)
        // uses health & max health to display a dynamic health bar
        const percent = (this.health/this.maxHealth)*100
        container.style.width = `${percent}%`
        percent < 25 ? container.classList.add("danger") : container.classList.remove("danger")

    }

    this.rollDice = function(){
        const container = document.querySelector(`#${this.type} .dice-container`)
        // updates the dice HTML by rolling dice and showing result
        this.currentDice = getDiceRolls(this.diceCount)
        container.innerHTML = this.currentDice.map(num=>`<div class="dice"><p>${num}</p></div>`).join('')        
    }
    this.setAvatar = function(){
        document.querySelector(`#${this.type} .avatar`).style.backgroundImage = `url("../${this.avatar}")`
    }
    this.setCharacterHTML= function(){
        // sets the initial HTML for the character card
        const container = document.querySelector(`#${this.type}`)
        const {name, diceCount} = this
        container.innerHTML = `<div class="avatar-container">
                    <h4 class="name">${name}</h4>
                    <div class="avatar"></div>
                    <p class="health">health: <span class="health-stat"></span></p>
                    <div class="health-bar-outer">
                        <div class="health-bar-inner">
                        </div>
                    </div>
                </div>
                <div class="dice-container">${getDicePlaceholderHTML(diceCount)}</div>`
        this.setAvatar()
        this.setHealth([0])
    }


}