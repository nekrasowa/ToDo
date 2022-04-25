const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const getElemByID = require("./getElemByID")

const resFromDB = require('./dataBases/resFromDB.js')
const mongoUsers = require('./dataBases/mongoUsers.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(cookieParser())

const accessTokenSecret = 'zk.,k.zjq69'


// app.use(async (req, res, next) => {

//   console.log('[req.cookies]', req.cookies)

//   const authToken = req.cookies['AuthToken']

//   req.user = await mongoUsers.getToken(authToken)

//   console.log('[req.user]', req.user)

//   next()
// })

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, accessTokenSecret, (err, user) => {
          if (err) {
              return res.sendStatus(403)
          }
          console.log('[req]', req.body)

          req.user = user
          console.log('[req]', req.user)

          next()
      });
  } else {
      res.sendStatus(401)
  }
};

app.get('/notes/get', authenticateJWT, async function(req, res) {
    try {
      const allNotes = await resFromDB.addArrOfOldNotes(req.user.email)
      const allId = await resFromDB.getAllId()
      const responseArr = [allNotes, allId]
      res.json(responseArr)
    } catch (err) {
      console.log(err)
      // TODO сообщить об ошибке
    }
})

app.post('/notes/add', authenticateJWT, async function(req, res) {
  try {
    const newNote = await resFromDB.addNewNote(req.body)
    console.log('[newNote]', newNote)

    if (newNote === true) {
      return res.json({ isOk: true })
    }
  
    return res.json({ isOk: false })
  
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.delete('/notes/delete', authenticateJWT, async function(req, res) {
  try {
    const deletedNote = await resFromDB.deleteElById(req.body.noteId)
    if (deletedNote) {
      return res.json({ isOk: true })
    }

    return res.json({ isOk: false })

  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.put('/notes/changeStatus', authenticateJWT, async function(req, res) {
  try {
    const changeNoteId = req.body.noteId
    const changeNoteStatus = req.body.status

    const changedNote = await resFromDB.changeStatus(changeNoteId, changeNoteStatus)

    if (changedNote) {
      return res.json({ isOk: true })
    }

    return res.json({ isOk: false })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.put('/notes/saveChanges', authenticateJWT, async function(req, res) {
  try {
    const changeNoteId = req.body.noteId
    const changeNoteobj = req.body.obj

    const newNote = await resFromDB.changeNote(changeNoteId, changeNoteobj)
    console.log('[newNote]:', newNote)

    if (newNote) {
      return res.json({ isOk: true })
    }

    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

///////////////////////////
///////////////////////////

app.get('/users/get', async function(req, res) {
  console.log('[connectGet]')
  console.log('[req.query]', req.query)
  
  try {
    const [userExist, id] = await mongoUsers.checkForRegistr(req.query)
    console.log('[userExist]:', userExist)

    if (userExist == true) {
      const exist = true
      const massage = 'This user exists yet! Login please'
      const url = 'identifPage.html'
      const status = { isOk: true }
      return res.json([exist, massage, url, status, id])
    }

    const exist = false
    const massage = 'We add new user, wait please!'
    const url = ''
    const status = { isOk: true }
    console.log('[returnF]:')

    return res.json([exist, massage, url, status])
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({ isOk: false })
  }
})

app.get('/users/get/check', async function(req, res) {
  console.log('[connectCheck]')
  console.log('[req.query]', req.query)
  
  try {
    const [identifStatus, massage, authToken] = await mongoUsers.checkForIdentif(req.query)
    console.log('[identifStatus]:', identifStatus)

    if (identifStatus == true) {
      const {email, password} = req.query
      const accessToken = jwt.sign({ email: email,  exp: Math.floor(new Date().getTime()/1000) + 7*24*60*60 }, accessTokenSecret)

      console.log(massage)

      const statusServ = { isOk: true }

      res.cookie('AuthToken', authToken)
      return res.json([ statusServ.isOk, identifStatus, accessToken ])
    }
    console.log(massage)
    const status = { isOk: true }
    console.log('[returnF]:')

    return res.json([status, identifStatus, null])
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({ isOk: false })
  }
})

app.post('/users/post', async function(req, res) {
  console.log('[connectPost]')

  try {
    const [statusAdd, id] = await mongoUsers.addUser(req.body)
    
    if (statusAdd == true) {
      const massage = 'New User is added! Login with your passord!'
      const url = 'identifPage.html'
      const status = { isOk: true }
      return res.json([massage, url, status, id])
    }

    const massage = 'New User is not added! Try again!'
    const url = 'identifPage.html'
    const status = { isOk: true }
    
    return res.json([massage, url, status, id])
    
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({ isOk: false })
  }
})

/////////////////////////
/////////////////////////


app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})

app.use((req, res) => {
  res
    .status(404)
    .sendFile(createPath('error'))
})



app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})
