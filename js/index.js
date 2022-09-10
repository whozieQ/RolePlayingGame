import { heroes, villians } from "./data.js"
import { Character } from "./character.js"
import { setButtons } from "./utils.js"


let players = []
let hero, villian
let round = 1
const heroCard = document.querySelector("#hero .character-card")
const villianCard = document.querySelector("#villian .character-card")

//render both the hero and villian on the page
function renderPlayers(){
    heroCard.innerHTML = hero.getCharacterHTML()
    villianCard.innerHTML = villian.getCharacterHTML() 
}

function attack(){playerTurn
    playerTurn(hero,villian)
    playerTurn(villian,hero)
    if (!hero.alive || !villian.alive){
        setTimeout(endRound,2000)
    }
}
function playerTurn(attacker, defender){
    // roll dice, reduce opponents health and update their health bar
    document.querySelector(`#${attacker.type} .dice-container`).innerHTML = attacker.getDiceHTML()
    document.querySelector(`#${defender.type} .health`).innerHTML = defender.getHealthHTML(attacker.currentDice)
    document.querySelector(`#${defender.type} .health-bar-outer`).innerHTML = defender.getHealthBarHTML()
}

function endRound(){
    if (!hero.alive) {  endGame()  }  
    else {
        if (round === 3){  endGame() }
        else{
            const message = `<div class="end-game">
                                <h2>Round ${round} Over !</h2>
                                <h3>Be Warned, Hero...<br>Evil hasn't given up yet !</h3>
                            </div>`
            setButtons("next")
            villianCard.innerHTML = message
            round += 1
        } 
    }
}

function endGame(){
    const endMessage = !hero.alive && !villian.alive ? `Alas, no survivors!<br> Evil is defeated, but at what cost?` : 
        hero.alive ? `${hero.name} has won!` : `${villian.name} has won!`
    const endEmoji = !hero.alive && !villian.alive ? '😔' : hero.alive ?'🏆' :'☠️'
    setButtons("reset")
    const loser = `<div class="end-game">
        <h2>Game Over</h2>
        <h3>${endMessage}</h3>
        <p class="end-emoji">${endEmoji}</p>
     </div>` 
    !hero.alive ?  heroCard.innerHTML = loser : ''
    !villian.alive ? villianCard.innerHTML = loser : ''
    !hero.alive && !villian.alive ? document.getElementById('hero').style.display = "none" : ''
}

function newRound(){
    //get next level villian
    players[1] = new Character(villians[round-1])
    villian = players[1]
    renderPlayers()
    setButtons("attack")
}

function newGame(){
    round = 1
    document.getElementById('hero').style.display = "initial"
    //randomly choose hero
    players = []
    players.push( new Character(heroes[Math.floor(Math.random()*heroes.length)]))
    //start with first level villian
    players.push( new Character(villians[0]))
    // create an easy alias for each player
    hero = players[0]
    villian = players[1]
    renderPlayers()
    setButtons("attack")
}

document.getElementById('attack-button').addEventListener("click",attack)
document.getElementById('reset-button').addEventListener("click",newGame)
document.getElementById('next-button').addEventListener("click",newRound)
newGame()



