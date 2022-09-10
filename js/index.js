import {heroes, villians} from "./data.js"
import {Character} from "./character.js"


//randomly choose one of each
const hero = new Character(heroes[Math.floor(Math.random()*heroes.length)])
const villian = new Character(villians[Math.floor(Math.random()*villians.length)])

//render both the hero and monster on the page
function renderPlayers(){
    document.getElementById('hero').innerHTML = hero.getCharacterHTML()
    document.getElementById('villian').innerHTML = villian.getCharacterHTML()
}

renderPlayers()




