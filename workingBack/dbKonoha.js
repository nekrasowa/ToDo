import {
    addShinobi
  } from './shinobiArray.js'
  
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
const db = client.db(dbName)
const col = db.collection('shinobi')


async function run() {
  try {
      await client.connect()
      console.log('Connected correctly to server')
      addShinobi(Naruto, col)
  } catch (err) {
      console.log(err.stack)
  }
  finally {
      // await client.close()
  }
}
run().catch(console.dir)

