import { getDiceRolls, getDicePlaceholderHTML } from "./utils.js"

// constructor to create a character object from one of the characters in the data
export class Character{
    constructor(data){
        // transfer all properties in data object into matching properties in this
        Object.assign(this,data)
        // add a new property indicating if the player is still alive
        this.alive = true
        // add a new property to store current health, starting with max health
        this.health = this.maxHealth
        this.currentDice = new Array(this.diceCount).fill(0)
        this.buffed = false
        this.nerfed = false

    }
 

    // methods
    setHealth (damage){
        const container = document.querySelector(`#${this.type} .health-stat`)
        const avatar = document.querySelector(`#${this.type} .avatar`)
        //updates health by calculating damage done by supplied set of dice rolled
        const totalDamage = damage.reduce((total,currentElement) => total + currentElement)
        this.health -= totalDamage

        if (this.health <=0){
            this.health = 0
            this.alive = false
            avatar.style.backgroundBlendMode = "darken"
        }
        container.textContent = totalDamage === 0 ? this.health : `${this.health} (${totalDamage} damage)`
        this.setHealthBar()
    }

    setHealthBar(){
        const container = document.querySelector(`#${this.type} .health-bar-inner`)
        // uses health & max health to display a dynamic health bar
        const percent = (this.health/this.maxHealth)*100
        container.style.width = `${percent}%`
        percent < 25 ? container.classList.add("danger") : container.classList.remove("danger")

    }

    rollDice(){
        // updates the dice HTML by rolling dice and showing result
        this.currentDice = getDiceRolls(this.diceCount)
        const container = document.querySelector(`#${this.type} .dice-container`)
        const html = this.currentDice.map(num=>`<div class="dice"><p>${num}</p></div>`).join('')        
        container.innerHTML = html
    }

    setAvatar(){
        document.querySelector(`#${this.type} .avatar`).style.backgroundImage = `url("../${this.avatar}")`
    }
    setCharacterHTML(){
        // sets the initial HTML for the character card
        const container = document.querySelector(`#${this.type}`)
        const {name, type} = this
        let extra = ""

        // randomly give character 1 more or less dice
        if (type === 'villain'){
            if (this.diceCount > 1){
                const buffMeUpChance = 20
                // console.log(`There is a 1 in ${buffMeUpChance} chance the villain will BUFF`)
                const gamble = (Math.floor(Math.random()*buffMeUpChance) + 1 )
                // console.log(gamble)
                if (gamble === buffMeUpChance){
                    this.diceCount += 1
                    this.buffed = true
                    extra =`<p class="chance">Buffed! +1 Die</p>`
                    // console.log("villain has been BUFFED")
                } 
            }
        } else {
            const nerfMeChance = 20
            // console.log(`There is a 1 in ${nerfMeChance} chance the hero will get NERFED`)
            const gamble = (Math.floor(Math.random()*nerfMeChance) + 1 )
            // console.log(gamble)
        if (gamble === nerfMeChance){
                this.diceCount -= 1
                this.nerfed = true
                extra =`<p class="chance">Cursed! -1 Die!</p>`
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
                <div class="dice-container">${extra}${getDicePlaceholderHTML(this.diceCount)}</div>`
        this.setAvatar()
        this.setHealth([0])
    }


}