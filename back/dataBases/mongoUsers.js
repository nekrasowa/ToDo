const crypto = require('crypto')
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb://localhost:27017'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
const dbName = 'ToDo'

async function checkForRegistr(userObj) {
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

async function checkForIdentif(userObj) {
  console.log('[connectMongoChek]')

  try {
    await client.connect()
    console.log('[connect]:')
    const {email, password} = userObj

    const getHashedPassword = (password) => {
      const sha256 = crypto.createHash('sha256')
      const hash = sha256.update(password).digest('base64')
      return hash
    }
  
    const hashPass = getHashedPassword(password)
  
    const db = await client.db(dbName)
    const usersCol = await db.collection('users')

    const user = await usersCol.findOne(
      { email: email,
        password: hashPass
      })

    if (user == null) {
      await client.close()
      const massage = 'User with this email or password is not found'
      return [ false,  massage, null ]
    }

    const authToken = generateAuthToken()
    const tokensCol = await db.collection('tokens')
    await tokensCol.insertOne({ authToken: user })
    const massage = 'Welcome to your notes!'
    await client.close()
    return [ true, massage, authToken ]
  } catch (err) {
    console.log(err)
    throw err
  }
}


const getHashedPassword = (password) => {
  const sha256 = crypto.createHash('sha256')
  const hash = sha256.update
  (password).digest('base64')
  return hash
}

const generateAuthToken = () => {
  return crypto.randomBytes(30).toString('hex')
}

async function addUser(userObj) {
  console.log('[connectMongoAdd]')

  try {
    await client.connect()
    console.log('[connect]:')

    const {name, email, password} = userObj

    const hashPass = getHashedPassword(password)

    const newUser = {
      name: name,
      email: email,
      password: hashPass
    }

    console.log('[newUser]', newUser)

    const db = await client.db(dbName)
    const usersCol = await db.collection('users')

    const addedUser = await usersCol.insertOne(newUser) 

    return [ addedUser.acknowledged, addedUser.insertedId ]
  }  catch (err) {
    console.log(err)
    throw err
  }
}

async function getToken(token) {
  console.log('[getToken]')

  try {
    await client.connect()
    console.log('[connect]:')

    const userToken = token
    const db = await client.db(dbName)
    const tokensCol = await db.collection('tokens')
    await tokensCol.insertOne({ userToken })

  } catch {
    console.log(err)
    throw err
  }
} 

// module.exports = {
//   checkForRegistr,
//   checkForIdentif,
//   addUser,
//   getToken
