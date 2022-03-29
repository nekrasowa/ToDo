const {
  addShinobi,
  getShinobi,
  findShinobi,
  addShinobiTown
} = require('./shinobiArray.js')

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

const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const dbName = 'Konoha'

async function run() {
  try {
      await client.connect()
      const db = await client.db(dbName)
      console.log('Connected correctly to server')
      const col = db.collection('shinobi')
      // await col.createIndex({element: 1, power: 1})
      // const indexes = await col.indexes()
      // console.log('[indexes]:', indexes)

      await col.find({element: 'earth', power: 30})
        .toArray(function(err, results){
        console.log(results)
        console.log(results.length)
      })
      // console.log('end');

  } catch (err) {
      console.log(err.stack)
  }
  // finally {
  //   console.log('end');
  // }
}
run().catch(console.dir)

// and or and
// если первый енд не срабатывает будет ли работать дальше другие