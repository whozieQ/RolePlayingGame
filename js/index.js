import {heroes, villians} from "./data.js"
import {Character} from "./character.js"



let players = []
let hero, villian

//render both the hero and villian on the page
function renderPlayers(){
     players.forEach(function(player){
         document.getElementById(player.type).innerHTML = player.getCharacterHTML()
      })
}

function attack(){
    takeTurn(hero,villian)
    takeTurn(villian,hero)
    if (!hero.alive || !villian.alive){
        endGame()
    }
}
function takeTurn(attacker, defender){
    document.querySelector(`#${attacker.type} .dice-container`).innerHTML = attacker.getDiceHTML()
    document.querySelector(`#${defender.type} .health`).innerHTML = defender.getHealthHTML(attacker.currentDice)
}

function endGame(){
    const endMessage = !hero.alive && !villian.alive ? `No victors! Everybody's dead` : hero.alive ? `${hero.name} has won!` : `${villian.name} has won!`
 console.log(endMessage)
    const endEmoji = !hero.alive && !villian.alive ? '😔' : hero.alive ?'🏆' :'☠️'
    document.getElementById("reset-button").style.display = "initial"
    document.getElementById("attack-button").style.display = "none"
    const loser = `<div class="end-game">
        <h2>Game Over</h2>
        <h3>${endMessage}</h3>
        <p class="end-emoji">${endEmoji}</p>
     </div>` 
    if (!hero.alive) {
        document.getElementById("hero").innerHTML = loser
    }
    if (!villian.alive) {
        document.getElementById("villian").innerHTML = loser
    }
}


function resetGame(){
    //randomly choose one of each
    players = []
    players.push( new Character(heroes[Math.floor(Math.random()*heroes.length)]))
    players.push( new Character(villians[Math.floor(Math.random()*villians.length)]))
    hero = players[0]
    villian = players[1]
    renderPlayers()
    document.getElementById("reset-button").style.display = "none"
    document.getElementById("attack-button").style.display = "initial"
}

document.getElementById('attack-button').addEventListener("click",attack)
document.getElementById('reset-button').addEventListener("click",resetGame)
resetGame()



