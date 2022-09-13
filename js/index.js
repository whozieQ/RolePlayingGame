import { Game } from "./character.js"


let game
let gameCount = 0
const modal = document.getElementById("modal")
const closeBtn = document.getElementById('close-button')
const soundEffect = new Audio("../dice.wav")


closeBtn.addEventListener("click",closeModal)
document.getElementById('attack-button').addEventListener("click",attack)

showIntro()

//render both the hero and villian on the page
function renderPlayers(){
    game.hero.setCharacterHTML()
    game.villian.setCharacterHTML() 
}
function closeModal(){
    modal.style.display = "none"
    gameCount === 0 ? newGame() : game.lastRound ? newGame() : newRound()
}
function openModal(message){
    document.getElementById("game-message").innerHTML = message
    modal.style.display = "block"
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
    soundEffect.play()
    attacker.rollDice()
    defender.setHealth(attacker.currentDice)
}

function endRound(){
    if (!game.hero.alive) {  endGame()  }  
    else {
        if (game.lastRound){  endGame() }
        else{
            openModal(`<h2>${game.villian.name} defeated!</h2><p>Oh no! The villian called for reinforcements with their dying breath..</p>`)
        } 
    }
}

function endGame(){
    closeBtn.textContent = "New Game"
    const hero = game.hero
    const villian = game.villian
    const message = !hero.alive && !villian.alive ? `Alas, no survivors! Evil is defeated, but at what cost?` : 
        hero.alive ? `${hero.name} has won!` : `${villian.name} has won!`
    const endEmoji = !hero.alive && !villian.alive ? '😔' : hero.alive ?'🏆' :'☠️'
    openModal(`<h2>Game Over!</h2><p> ${message}<br>${endEmoji}</p>`)
}

function newRound(){
    game.nextRound()
    renderPlayers()
}

function newGame(){
    game = new Game()
    gameCount ++
    renderPlayers()
 
}

function showIntro(){
    closeBtn.textContent = "I'm Ready"
    const introMessage = `<h2>Dice Battle: Hero vs Villian</h2><p>
    Both characters roll dice to attack.<br>
    Damage = the opponent's dice total.<br>
    Health is reduced by Damage.<br>
    Last one with health left... wins.</p>`
    openModal(introMessage)

}







