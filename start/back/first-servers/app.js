const express = require('express')
const app = express()
const port = 4000

const oldNotesArr = [
  {
    heading: 'Первая', 
    text: 'и текст', 
    ready: false 
  },
  {
    heading: 'Вторая', 
    text: 'И ее текст', 
    ready: false
  }
]

app.get('/', function(req, res) {
  res.set('Access-Control-Allow-Origin', '*')
  res.json(oldNotesArr)
})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
})
