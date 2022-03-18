'use strict'

class Weapon {
  constructor(power) {
    this.power = power
  }
}

class Person {
  constructor(name, age, gender, haircolor, weapon) {
    this.name = name
    this.age = age
    this.gender = gender
    this.haircolor = haircolor
    this.weapon = weapon
  }

  fightTime() {
    return `${this.weapon} min`
  }
}

const nps = new Person({
  name: 'NPS',
  age: 20,
  gender: 'male',
  haircolor: 'gray',
  weapon: 10
}) 

class Shinobi extends Person {
  constructor(name, age, gender, haircolor, weapon, town, rank, power) {
    super(name, age, gender, haircolor, weapon) 
    this.town = town
    this.rank = rank
    this.power = power
  }

  fightTime() {
    const result = (this.rank * this.power * this.weapon) / 60 / 24
    return Math.ceil(result) + ' day'
  }
}

const sakura = new Shinobi(
  'Sakura',
  16,
  'female',
  'pink',
  100,
  'Konoha',
  3,
  100
) 

const saske = new Shinobi(
  'Saske',
  16,
  'male',
  'black',
  120,
  'Konoha',
  3,
  80
) 

const kakashi = new Shinobi(
  'Kakashi',
  16,
  'male',
  'pink',
  150,
  'Konoha',
  4,
  70
) 

class Jinchuriki extends Shinobi {
  constructor(town, rank, power, demonName, demonTail) {
    super(town, rank, power)
    this.demonName = demonName
    this.demonTail = demonTail
  }  
  
  fightTime() {
    const result = (this.rank * this.power * this.weapon * this.demonTail) / 60 / 24
    return Math.ceil(result) + ' day'
  }
}

const naruto = new Jinchuriki(
  'Naruto',
  16,
  'male',
  'yelow',
  130,
  'Konoha',
  1,
  70,
  'Kurama',
  9
)

const gaara = new Jinchuriki(
  'Gaara',
  16,
  'male',
  'rad',
  150,
  'Suna',
  4,
  80,
  'Shukaku',
  1
)

const bi = new Jinchuriki(
  'Bi',
  36,
  'male',
  'red',
  200,
  'Kumo',
  3,
  100,
  'Gjuki',
  8
)


nps.fightTime()
naruto.fightTime()
saske.fightTime()
