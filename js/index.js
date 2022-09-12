import { heroes, villians } from "./data.js"
import { Character } from "./character.js"
import { setButtons, toggleAttackButton } from "./utils.js"


let players = []
let hero, villian
let round = 1

const endMessage = document.getElementById("end-game")

//render both the hero and villian on the page
function renderPlayers(){
    hero.setCharacterHTML()
    villian.setCharacterHTML() 
}

function attack(){playerTurn
    playerTurn(hero,villian)
    playerTurn(villian,hero)
    if (!hero.alive || !villian.alive){
        // setTimeout(endRound,2000)
        endRound()
    }
}
function playerTurn(attacker, defender){
    // roll dice, reduce opponents health and update their health bar
    attacker.rollDice()
    defender.setHealth(attacker.currentDice)
}

function endRound(){
    if (!hero.alive) {  endGame()  }  
    else {
        if (round === 3){  endGame() }
        else{
            toggleAttackButton()
            endMessage.textContent = "The villian called for reinforcements with their dying breath..."
            round += 1
            setTimeout(()=> {setButtons("next")},4000)

        } 
    }
}

function endGame(){
    toggleAttackButton()
    const message = !hero.alive && !villian.alive ? `Alas, no survivors! Evil is defeated, but at what cost?` : 
        hero.alive ? `${hero.name} has won!` : `${villian.name} has won!`
    const endEmoji = !hero.alive && !villian.alive ? '😔' : hero.alive ?'🏆' :'☠️'
    endMessage.textContent = `Game Over! ${message}${endEmoji}`
    setTimeout(()=> {setButtons("reset")},5000)
}

function newRound(){
    //get next level villian
    players[1] = new Character(villians[round-1])
    villian = players[1]
    renderPlayers()
    endMessage.textContent = ''
    setButtons("attack")
}

function newGame(){
    round = 1
    endMessage.textContent = ''
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







