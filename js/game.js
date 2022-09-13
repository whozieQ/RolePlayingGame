import { heroes, villians } from "./data.js"
import { Character}  from "./character.js"

export class Game{
    constructor(){
        this.round = 1
        this.numRounds = villians.length
        this.lastRound = false
        this.inProgress = false
        // randomly select a hero
        this.hero = new Character(heroes[Math.floor(Math.random()*heroes.length)])
        //start with the first villian
        this.villian = null
        this.nextVillian()
    }
    // methods
    nextRound(){
        this.round += 1
        this.round === this.numRounds ? this.lastRound = true : this.lastRound = false
        this.nextVillian()
    }

    nextVillian(){
        this.villian = new Character(villians[this.round - 1])
    }

    getWinner(){
        let winner = "none"
        if (this.hero.alive && this.villian.alive){ winner = "none" }
        if (!this.hero.alive && !this.villian.alive){ winner = "tie" }
        if (this.hero.alive) { winner = "hero" } else { winner = "villian" }
        return winner
    }


}