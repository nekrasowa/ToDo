const Naruto = {
  'name': { 'first': 'Naruto', 'klan': 'Udsumaki' },
  'rank': 'genin',
  'power': 50,
  'element': 'wind',
  'type of attack': 'close combat',
  'feature': 'jinchuriki'
}

const Sakura = {
  'name': { 'first': 'Sakura', 'klan': 'Haruno' },
  'rank': 'chunin',
  'power': 40,
  'element': '',
  'type of attack': ['close combat', 'medical technique'],
  'feature': 'medic'
}

const Sasuke = {
  'name': { 'first': 'Sasuke', 'klan': 'Uchiha' },
  'rank': 'genin',
  'power': 55,
  'element': ['fire', 'lightning'],
  'type of attack': ['distance fighting', 'medical technique'],
  'feature': ['sharingan', 'sword']
}

const Kakashi = {
  'name': { 'first': 'Kakashi', 'klan': 'Hataki' },
  'rank': 'dsenin',
  'power': 60,
  'element': ['fire', 'lightning', 'earth', 'woter'],
  'type of attack': ['close combat', 'medical technique'],
  'feature': 'sharingan'
}

export async function addShinobi(name, col) {
  try {
    await col.insertOne(name)
    await col.findOne({ 'first': `${name}`});

  } catch (err) {
    console.log(err.stack)
  }
}

