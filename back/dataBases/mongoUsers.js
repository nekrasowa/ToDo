const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const dbName = 'ToDo'

async function checkForUser(userObj) {
  console.log('[connectMongoChek]')

  try {
    await client.connect()
    console.log('[connect]:')
    const {name, email, password} = userObj
    const db = await client.db(dbName)
    const usersCol = await db.collection('users')

    const userEmail = await usersCol.findOne({ email: email })

    if (userEmail !== null) {
      await client.close()
      return [ true, userEmail.insertedId ]
    }

    const userName = await usersCol.findOne(
      { name: name,
        password: password
      }
       )
    
    if (userName !== null) {
      await client.close()
      return [ true, userName._id ]
    }

    await client.close()
    // console.log('[allNotesMDB]', allNotes)

    return [ false, null ]

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addUser(userObj) {
  console.log('[connectMongoAdd]')

  try {
    await client.connect()
    console.log('[connect]:')

    const db = await client.db(dbName)
    const usersCol = await db.collection('users')

    const newUser = await usersCol.insertOne(userObj) 

    return [ newUser.acknowledged, newUser.insertedId ]
  }  catch (err) {
    console.log(err)
    throw err
  }
}

module.exports = {
  checkForUser,
  addUser
}