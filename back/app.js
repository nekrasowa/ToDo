const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const getElemByID = require("./getElemByID")

const resFromDB = require('./dataBases/postgreSQL')
// const SQLUsers = require('./dataBases/SQLUsers.js')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
// const bodyParser = require('body-parser')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())

const accessTokenSecret = 'zk.,k.zjq69'

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

// app.get('/notes/get', async function(req, res) {
  app.get('/notes/get', authenticateJWT, async function(req, res) {
    try {
      const token = req.headers.authorization.replace('Bearer ', '')
      const allNotes = await resFromDB.addArrOfOldNotes(token)
      const allId = await resFromDB.getAllId(token)
      const responseArr = [allNotes, allId]
      res.json(responseArr)
    } catch (err) {
      console.log(err)
      // TODO сообщить об ошибке
    }
})

// app.post('/notes/add', async function(req, res) {
  app.post('/notes/add', authenticateJWT, async function(req, res) {
  try {
    console.log('[req.bodyADD]', req.body)

    const newNote = await resFromDB.addNewNote(req.body)

    console.log('[newNoteREQ]', newNote.id)

    if (newNote !== null) {
      return res.json([{ isOk: true }, {id: newNote.id}])
    }
  
    return res.json({ isOk: false })
  
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

// app.delete('/notes/delete', async function(req, res) {
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

// app.put('/notes/changeStatus', async function(req, res) {
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

// app.put('/notes/saveChanges', async function(req, res) {
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

app.get('/users/get/check', async function(req, res) {
  console.log('[connectCheck]')
  console.log('[req.query]', req.query)
  
  try {
    const user = await resFromDB.checkForIdentif(req.query)

    const [ identifStatus, massage, token ] = user
    console.log('[identifStatus]:', identifStatus)

    if (identifStatus === true) {
      const {email, password} = req.query
      const accessToken = jwt.sign({ email: email,  exp: Math.floor(new Date().getTime()/1000) + 7*24*60*60 }, accessTokenSecret)

      console.log(massage)

      const statusServ = { isOk: true }
      console.log('[accessToken]', accessToken)

      // res.cookie('AuthToken', authToken)
      return res.json([ statusServ.isOk, identifStatus, accessToken ])
    }
    console.log(massage.massage)
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
    const statusAdd = await resFromDB.addUser(req.body)
    console.log('[statusAdd]', statusAdd)
    
    if (statusAdd === true) {
      const massage = 'New User is added! Login with your passord!'
      const url = 'identifPage.html'
      const status = { isOk: true }
      return res.json([massage, url, status, statusAdd])
    }

    const massage = 'New User is not added! Try again!'
    const url = 'registerPage.html'
    const status = { isOk: true }
    
    return res.json([massage, url, status, statusAdd])
    
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

app.use(function(req, res, next) {
  res.status(404)

  // respond with json
  if (req.accepts('json')) {
    res.json({ error: 'Not found' })
    return
  }

  // default to plain-text. send()
  res.type('txt').send('Not found')
});



app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
})
