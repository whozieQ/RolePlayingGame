// a choice of multiple types of heroes and villains as players

const heroes = [
    {
        name: "Dumbledore",
        type: "hero",
        avatar: "images/hero.jpg",
        maxHealth: 60,
        diceCount: 3,
        currentDice:[]
    },
    {
        name: "McGonagall",
        type: "hero",
        avatar: "images/minerva.jpg",
        maxHealth: 60,
        diceCount: 3,
        currentDice:[]
    },
    {
        name: "Thor",
        type: "hero",
        avatar: "images/thor.jpg",
        maxHealth: 60,
        diceCount: 3,
        currentDice:[]
    },  
]
const villains = [
    {
        name: "Bellatrix",
        type: "villain",
        avatar: "images/beatrix.jpg",
        maxHealth: 30,
        diceCount: 1,
        currentDice:[]
    },
    {
        name: "Loki",
        type: "villain",
        avatar: "images/loki.jpg",
        maxHealth: 25,
        diceCount: 2,
        currentDice:[]
    },
    {
        name: "Voldemort",
        type: "villain",
        avatar: "images/monster.jpg",
        maxHealth: 20,
        diceCount: 3,
        currentDice:[]
    }

]

// make this object visible to other JS files
export {heroes, villains}