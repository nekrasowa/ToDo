const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const getElemByID = require("./getElemByID")

const oldNotesArr = [
  {
    heading: 'Первая', 
    text: 'и текст', 
    ready: false,
    id: 'note-0' 
  },
  {
    heading: 'Вторая', 
    text: 'И ее текст', 
    ready: false,
    id: 'note-1'
  }
]

app.use(cors())
app.use(express.json())

app.get('/', function(req, res) {
  res.json(oldNotesArr)
})

app.post('/add', function(req, res) {
  try {
    oldNotesArr.push(req.body)

    console.log(`Note is added!`)
    console.log(oldNotesArr)

    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.delete('/delete', function(req, res) {
  try {
    console.log('[/delete]')

    const indexOfDeletedNote = getElemByID(oldNotesArr, req.body.noteId)

    if (indexOfDeletedNote === -1) {
      res.status(400)
      res.json({ isOk: false })
    }

    oldNotesArr.splice(indexOfDeletedNote, 1)
    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.put('/status/false', function(req, res) {
  try {
    console.log('[/status/false]')

    const indexOfChangedNote = getElemByID(oldNotesArr, req.body.noteId)

    if (indexOfChangedNote === -1) {
      res.status(400)
      res.json({ isOk: false })
    }
    
    oldNotesArr[indexOfChangedNote].ready = false
    console.log('[obj]:', oldNotesArr[indexOfChangedNote])
    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.put('/status/true', function(req, res) {
  try {
    console.log('[/status/true]')

    const indexOfChangedNote = getElemByID(oldNotesArr, req.body.noteId)

    if (indexOfChangedNote === -1) {
      res.status(400)
      res.json({ isOk: false })
    }
    
    oldNotesArr[indexOfChangedNote].ready = true
    
    console.log('[obj]:', oldNotesArr[indexOfChangedNote])
    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})
