const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

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

app.post('/', function(req, res) {
  try {
    console.log('[POST-/]:', req.body)
  
    oldNotesArr.push(req.body)

    console.log(`Note is added!`)
    console.log(oldNotesArr)

    res.json({ isOk: true })
  } catch (err) {
    res.status(500)
    res.json({ isOk: false })
  }
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})
