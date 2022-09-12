import { Game } from "./character.js"
import { setButtons, toggleAttackButton } from "./utils.js"


let game
const endMessage = document.getElementById("end-game")

document.getElementById('attack-button').addEventListener("click",attack)
document.getElementById('reset-button').addEventListener("click",newGame)
document.getElementById('next-button').addEventListener("click",newRound)

newGame()

//render both the hero and villian on the page
function renderPlayers(){
    game.hero.setCharacterHTML()
    game.villian.setCharacterHTML() 
}

// both players attack and results are shown
function attack(){
    playerTurn(game.hero,game.villian)
    playerTurn(game.villian,game.hero)
    if (!game.hero.alive || !game.villian.alive){
        endRound()
    }
}

// roll dice, reduce opponents health and update their health bar
function playerTurn(attacker, defender){
    attacker.rollDice()
    defender.setHealth(attacker.currentDice)
}

function endRound(){
    if (!game.hero.alive) {  endGame()  }  
    else {
        if (game.lastRound){  endGame() }
        else{
            toggleAttackButton()
            endMessage.textContent = "The villian called for reinforcements with their dying breath..."
            // make the Next Round button visible
            setTimeout(()=>{setButtons("next")},2000)
        } 
    }
}

function endGame(){
    toggleAttackButton()
    const hero = game.hero
    const villian = game.villian
    const message = !hero.alive && !villian.alive ? `Alas, no survivors! Evil is defeated, but at what cost?` : 
        hero.alive ? `${hero.name} has won!` : `${villian.name} has won!`
    const endEmoji = !hero.alive && !villian.alive ? '😔' : hero.alive ?'🏆' :'☠️'
    endMessage.textContent = `Game Over! ${message}${endEmoji}`
    setTimeout(()=> {setButtons("reset")},4000)
}

function newRound(){
    endMessage.textContent = ''
    game.nextRound()
    renderPlayers()
    setButtons("attack")
}

function newGame(){
    game = new Game()
    console.log(game)
    endMessage.textContent = ''
    renderPlayers()
    setButtons("attack")
}







