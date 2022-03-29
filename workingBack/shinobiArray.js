async function addShinobi(name, col) {
  try {
    await col.insertOne(name)
    await col.findOne({ 'first': `${name}`});

  } catch (err) {
    console.log(err.stack)
  }
}
async function getShinobi(col) {
  try {
    await col.find().toArray(function(err, results){
                 
    console.log(results)
    })
  } catch (err) {
    console.log(err.stack)
  }
}
async function findShinobi(col) {
  try {
    await col.find({rank: 'genin'}).toArray(function(err, results){
                 
    console.log(results)
    })
  } catch (err) {
    console.log(err.stack)
  }
}

function arrayRandElement(arr) {
  const rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function getRandomPower(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const element = ['fire', 'lightning', 'earth', 'woter', 'wind']
const type = ['close combat', 'medical technique', 'distance fighting']
const feature = ['jinchuriki', 'medic', 'sharingan', 'kikajchu', 'bjakugan', 'pinegan', 'hidsutsu', 'tajdjitsu']
const rank = ['genin', 'chuunin', 'dzenin', 'ANBU', 'hokage']

async function addShinobiTown(col) {
  try {
    let idName 

    for (idName = 26354; idName < 1300000; idName++) {
      const id = {
        'name': idName,
        'rank': arrayRandElement(rank),
        'power': getRandomPower(10, 150),
        'element': [arrayRandElement(element), arrayRandElement(element), arrayRandElement(element)],
        'type of attack': [arrayRandElement(type), arrayRandElement(type), arrayRandElement(type)],
        'feature': [arrayRandElement(feature), arrayRandElement(feature), arrayRandElement(feature)]
      }
      await col.insertOne(id)
    }
  } catch (err) {
    console.log(err.stack)
  }
}
module.exports = {
  findShinobi,
  addShinobi,
  getShinobi,
  addShinobiTown
}


