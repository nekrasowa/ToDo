const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000
const getElemByID = require("./getElemByID")

const resFromDB = require('./dataBases/resFromDB.js')
// const oldNotesArr = [
//   {
//     heading: 'Первая', 
//     text: 'и текст', 
//     ready: true,
//     id: 'note-0' 
//   },
//   {
//     heading: 'Вторая', 
//     text: 'И ее текст', 
//     ready: false,
//     id: 'note-1'
//   }
// ]

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

app.put('/notes/changeStatus', function(req, res) {
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

app.use((req, res) => {
  res
    .status(404)
    .sendFile(createPath('error'))
})
