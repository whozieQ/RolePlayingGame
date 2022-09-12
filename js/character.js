import { getDiceRolls, getDicePlaceholderHTML } from "./utils.js"
import { heroes, villians } from "./data.js"

export function Game(){
    this.round = 1
    this.numRounds = villians.length
    this.lastRound = false

    this.nextRound = function(){
        this.round += 1
        this.round === this.numRounds ? this.lastRound = true : this.lastRound = false
        this.nextVillian()
    }

    this.nextVillian = function(){
        this.villian = new Character(villians[this.round - 1])
    }

    // randomly select a hero
    this.hero = new Character(heroes[Math.floor(Math.random()*heroes.length)])
    //start with the first villian
    this.villian = null
    this.nextVillian()


}
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
        const {name, type} = this
        // randomly give character 1 more or less dice
        if (type === 'villian'){
            if (this.diceCount > 1){
                const buffMeUpChance = 20
                // console.log(`There is a 1 in ${buffMeUpChance} chance the villian will BUFF`)
                const gamble = (Math.floor(Math.random()*buffMeUpChance) + 1 )
                // console.log(gamble)
                if (gamble === buffMeUpChance){
                    this.diceCount += 1
                    // console.log("Villian has been BUFFED")
                } 
            }
        } else {
            const nerfMeChance = 12
            // console.log(`There is a 1 in ${nerfMeChance} chance the hero will get NERFED`)
            const gamble = (Math.floor(Math.random()*nerfMeChance) + 1 )
            // console.log(gamble)
        if (gamble === nerfMeChance){
                this.diceCount -= 1
                // console.log("Hero has been NERFED")
            } 
        }
        container.innerHTML = `<div class="avatar-container">
                    <h4 class="name">${name}</h4>
                    <div class="avatar"></div>
                    <p class="health">health: <span class="health-stat"></span></p>
                    <div class="health-bar-outer">
                        <div class="health-bar-inner">
                        </div>
                    </div>
                </div>
                <div class="dice-container">${getDicePlaceholderHTML(this.diceCount)}</div>`
        this.setAvatar()
        this.setHealth([0])
    }


}