import { heroes, villains } from "./data.js"
import { Character}  from "./character.js"

export class Game{
    constructor(){
        this.round = 1
        this.numRounds = villains.length
        this.lastRound = false
        this.inProgress = false
        // randomly select a hero
        this.hero = new Character(heroes[Math.floor(Math.random()*heroes.length)])
        //start with the first villain
        this.villain = null
        this.nextvillain()
    }
    // methods
    nextRound(){
        this.round += 1
        this.round === this.numRounds ? this.lastRound = true : this.lastRound = false
        this.nextvillain()
    }

    nextvillain(){
        this.villain = new Character(villains[this.round - 1])
    }

    getWinner(){
        let winner = "none"
        if (this.hero.alive && this.villain.alive){ winner = "none" }
        if (!this.hero.alive && !this.villain.alive){ winner = "tie" }
        if (this.hero.alive) { winner = "hero" } else { winner = "villain" }
        return winner
    }


}