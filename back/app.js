const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const getElemByID = require("./getElemByID")

const oldNotesArr = [
  {
    heading: 'Первая', 
    text: 'и текст', 
    ready: true,
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

    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.delete('/delete', function(req, res) {
  try {
    const indexOfDeletedNote = getElemByID(oldNotesArr, req.body.noteId)

    if (indexOfDeletedNote === -1) {
      res.status(400)
      res.json({ isOk: false })

      return
    }

    oldNotesArr.splice(indexOfDeletedNote, 1)
    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.put('/changeStatus', function(req, res) {
  try {
    const indexOfChangedNote = getElemByID(oldNotesArr, req.body.noteId)

    if (indexOfChangedNote === -1) {
      res.status(400)
      res.json({ isOk: false })

      return
    }
    
    oldNotesArr[indexOfChangedNote].ready = req.body.status

    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

// app.get('/getStatus', function(req, res) {
//   try {
//     console.log("noteId", req.query.noteId)
//     const indexOfChangedNote = getElemByID(oldNotesArr, req.query.noteId)
    
//     if (indexOfChangedNote === -1) {
//       res.status(400)
//       res.json({ isOk: false })

//       return
//     }

//     console.log('[indexOfChangedNote]', indexOfChangedNote)
//     console.log('[oldNotesArr]', oldNotesArr)

//     const status = oldNotesArr[indexOfChangedNote].ready
//     console.log('[status]', status, typeof status)
    
//     res.json({ status, isOk: true })
//   } catch (err) {
//     res.status(500)
//     res.json({ isOk: false })
//   }
// })

// app.put('/getStatus', function(req, res) {
//   try {
    
//     const indexOfChangedNote = getElemByID(oldNotesArr, req.body.noteId)

//     const status = oldNotesArr[indexOfChangedNote].ready
//     console.log('[oldNotesArr]', oldNotesArr)
    
//     res.json( {status: status} )
//   } catch (err) {
//     res.status(500)
//     res.json({ isOk: false })
//   }
// })


app.put('/saveChanges', function(req, res) {
  try {
    const indexOfChangedNote = getElemByID(oldNotesArr, req.body.noteId)

    if (indexOfChangedNote === -1) {
      res.status(400)
      res.json({ isOk: false })

      return
    }
    
    oldNotesArr[indexOfChangedNote] = req.body.obj
    console.log('[oldNotesArr[indexOfChangedNote]', req.body.obj)
    
    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})
