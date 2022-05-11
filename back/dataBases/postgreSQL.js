const { Sequelize, DataTypes } = require('sequelize')
const crypto = require('crypto')

const sequelize = new Sequelize(
  'codecare',
  'codecare',
  null,
  {
    host: "127.0.0.1",
    port: 5432,
    dialect: 'postgres',
  }
)

;(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await User.sync()
  } catch (err) {
    console.error('Unable to connect to the database:', error);
  }
})

setTimeout(async () => {
  try {
    // await Note.drop()
    await Note.sync({ alter: true })
    console.log("synced")
  } catch(err) {
    console.log('[ERR-synced]', err)
  }
}, 2000)

// const close = sequelize
//   .close()
//   .then(() => console.log('Closed.'))
//   .catch((err) =>
//   console.error('Close connection error: ', err)
//   )

const User = sequelize.define('User', {
    name: {
      type: DataTypes.TEXT,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    tableName: 'Users',
  }
)

// User.sync()

const Note = sequelize.define('Note', {
    heading: {
      type: DataTypes.TEXT,
    },
    text: {
      type: DataTypes.TEXT,
    },
    ready: {
      type: DataTypes.BOOLEAN,
    },
    user: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  { 
    sequelize,
    tableName: 'Notes',
  }
)

// Note.sync()

const Token = sequelize.define('Token', {
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.TEXT,
      allowNull: false,
    }
  },
  { 
    sequelize, 
    tableName: 'tokens' 
  }
)

// Token.sync()

/////////////

async function addArrOfOldNotes(userToken) {
  try {
    const allNotes = await Note.findAll({
      where: { user: userToken }
  })
    
    // console.log('[allNotesSQL]', typeof allNotes, allNotes)

    return allNotes

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function getAllId(userToken) {
  try {

    const notesId = await Note.findAll({
      where: { user: userToken },
      attributes: ['id']
    })
    // console.log('[notesId]:', notesId)

    const idArr = []

    notesId.forEach((id) => {
      idArr.push(id.dataValues.id)
    })

    // const allNotesIdArr = JSON.stringify(notesId, null, 2)
    console.log('[idArr]:', idArr)

    return idArr
  } catch (err) {
    console.log(err)
    throw err
  }
}

async function deleteElById(noteId) {
  try {

    const deletedNote = await Note.destroy({
      where: {
        id: noteId
      }
    });
    // const allNotes = await cursor.toArray();
    console.log('[deletedNote]', deletedNote, typeof deletedNote)
    // await close
    return deletedNote

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function addNewNote(JSONobjOfNote) {
  try {

    console.log('[addNewNote]:', JSONobjOfNote)

    // JSONobjOfNote.id = 98
    const addedNote = await Note.create(JSONobjOfNote)
    // const allNotes = await cursor.toArray();
    console.log('[addedNote]', typeof addedNote, addedNote.dataValues)
    // await close
    return addedNote.dataValues

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function changeStatus(NoteId, status) {
  try {
    
    const changedNote = await Note.update(
      { ready: status },
      { where: { id: NoteId } },
    );
    console.log('[changedNote]:', typeof changedNote, changedNote)
    
    // await close
    return 
    // changedStatus.acknowledged

  } catch (err) {
    console.log(err)
    throw err
  }
}

async function changeNote(noteId, obj) {
  try {

    console.log('[connect changeNote]:')
    console.log('[obj changeNote]:', obj)
    
    const changedNote = await Note.update(
      obj, 
      { where: { id: noteId } }
    );
    console.log('[changedNote]:', typeof changedNote, changedNote )
    // await close
    return 
    
  } catch (err) {
    console.log(err)
    throw err
  }
}


////////////////////////////


async function checkForIdentif(userObj) {
  console.log('[connectSQLChek]')
  try {
    const {email, password} = userObj

    const getHashedPassword = (password) => {
      const sha256 = crypto.createHash('sha256')
      const hash = sha256.update(password).digest('base64')
      return hash
    }
   
    const hashPass = getHashedPassword(password)
  
    const user = await User.findOne(
      { email: email,
        password: hashPass
      })

    if (user == null) {
      const massage = 'User with this email or password is not found'
      return { isFinded: false, massage: massage, token: null }  
    }

    const authToken = generateAuthToken()
    await Token.sync({ force: true })
    await Token.create({ token: authToken, userEmail: email })
    const massage = 'Welcome to your notes!'

    const isFinded = true
    
    return [ isFinded,  massage, authToken ]  
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
  console.log('[connectSQLAdd]')

  try {
    const { name, email, password } = userObj

    const hashPass = getHashedPassword(password)

    const newUser = {
      name: name,
      email: email,
      password: hashPass
    }

    console.log('[newUser]', newUser)
    const addedUser = await User.create(newUser)
    console.log('[addedUser]:', addedUser.dataValues)

    const isAdded = true
    return isAdded
  } catch (err) {
    console.log('[ERR-addUser]', err)
    if (err.name == 'SequelizeUniqueConstraintError') {
      const isAdded = false

      return isAdded
    }
    throw err
  }
}

async function getToken(token) {
  console.log('[getToken]')

  try {
    const userToken = token
    await Token.create({ userToken })
    // await close
    return
  } catch {
    console.log(err)
    throw err
  }
} 

module.exports = {
  addArrOfOldNotes,
  getAllId,
  deleteElById,
  addNewNote,
  changeStatus,
  changeNote,
  checkForIdentif,
  addUser,
  getToken
}
