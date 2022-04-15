const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

// const resFromDB = require('./dataBases/resFromDB.js')

app.use(cors())
app.use(express.json())

app.get('/users/get', async function(req, res) {
  console.log('[connectGet]')
  console.log('[req.query]', req.query)
  
  try {
    const [userExist, id] = await checkForUser(req.query)
    console.log('[id]', id)

    if (userExist == true) {
      const exist = true
      const massage = 'This user exists yet! Login please'
      const url = 'Users/codecare/projects/ludochka/ToDo/front/js/enter/identifPage.html'
      const status = { isOk: true }
      return res.json([exist, massage, url, status, id])
    }

    const exist = false
    const massage = 'We add new user, wait please!'
    const url = ''
    const status = { isOk: true }

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
    const [statusAdd, id] = await addUser(req)
    
    if (statusAdd == true) {
      const massage = 'New User is added! Login with your passord!'
      const url = 'Users/codecare/projects/ludochka/ToDo/front/js/enter/identifPage.html'
      const status = { isOk: true }
      return res.json([massage, url, status, id])
    }

    const massage = 'New User is not added! Try again!'
    const url = 'Users/codecare/projects/ludochka/ToDo/front/js/enter/registerPage.html'
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

