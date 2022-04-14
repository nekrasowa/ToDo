const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const getElemByID = require("./getElemByID")

const resFromDB = require('./dataBases/resFromDB.js')
const mongoUsers = require('./dataBases/mongoUsers.js')

app.use(cors())
app.use(express.json())

app.get('/notes/get', async function(req, res) {
    try {
      const allNotes = await resFromDB.addArrOfOldNotes()
      const allId = await resFromDB.getAllId()
      const responseArr = [allNotes, allId]
      res.json(responseArr)
    } catch (err) {
      console.log(err)
      // TODO сообщить об ошибке
    }
})

app.post('/notes/add', async function(req, res) {
  try {
    const newNote = await resFromDB.addNewNote(req.body)
    // console.log('[newNote]', newNote)

    if (newNote === true) {
      return res.json({ isOk: true })
    }
  
    return res.json({ isOk: false })
  
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.delete('/notes/delete', async function(req, res) {
  try {
    // const indexOfDeletedNote = getElemByID(oldNotesArr, req.body.noteId)

    // if (indexOfDeletedNote === -1) {
    //   res.status(400)
    //   res.json({ isOk: false })

    //   return
    // }

    // oldNotesArr.splice(indexOfDeletedNote, 1)

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

app.put('/notes/changeStatus', async function(req, res) {
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

app.put('/notes/saveChanges', async function(req, res) {
  try {
    const changeNoteId = req.body.noteId
    const changeNoteobj = req.body.obj
    console.log('[changeNoteId]:', changeNoteId)
    console.log('[changeNoteobj]:', changeNoteobj)

    const newNote = await resFromDB.changeNote(changeNoteId, changeNoteobj)
    console.log('[newNote]:', newNote)

    if (newNote) {
      return res.json({ isOk: true })
    }

    return res.json({ isOk: false })

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
    const [userExist, id] = await mongoUsers.checkForUser(req.query)
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
    console.log('[return]:')

    return res.json([exist, massage, url, status])
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
