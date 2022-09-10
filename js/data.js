// a choice of multiple types of heroes and villians as players

const heroes = [
    {
        name: "Dumbledore",
        type: "hero",
        avatar: "images/hero.jpg",
        health: 60,
        diceCount: 3,
        currentDice:[]
    },
    {
        name: "McGonagall",
        type: "hero",
        avatar: "images/minerva.jpg",
        health: 50,
        diceCount: 3,
        currentDice:[]
    },
    {
        name: "Thor",
        type: "hero",
        avatar: "images/thor.jpg",
        health: 60,
        diceCount: 3,
        currentDice:[]
    },  
]
const villians = [
    {
        name: "Voldemort",
        type: "villian",
        avatar: "images/monster.jpg",
        health: 60,
        diceCount: 3,
        currentDice:[]
    },
    {
        name: "Loki",
        type: "villian",
        avatar: "images/loki.jpg",
        health: 20,
        diceCount: 2,
        currentDice:[]
    },
    {
        name: "Bellatrix",
        type: "villian",
        avatar: "images/beatrix.jpg",
        health: 30,
        diceCount: 2,
        currentDice:[]
    }
]

// make this object visible to other JS files
export {heroes, villians}