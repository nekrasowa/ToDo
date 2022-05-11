'use strict'

async function registerNewUser() {
  console.log('[connectStart]')

  const login = document.querySelector('.login')
  const email = document.querySelector('.mail')
  const password = document.querySelector('.password')

  const newUser = {
    name: login.value,
    email: email.value,
    password: password.value
  }
  console.log('[newUser]', newUser)

  const userInDB = await addNewUser(newUser)

  const [massage, url, status, statusAdd] = userInDB

  if (status.isOk == false) {
    return new Error('Problem on server, try later!')
  }

  if (statusAdd == false) {
    return console.log(massage)
  }
  
  console.log(massage)

  setTimeout(() => {
    window.location.href = url;
  }, 2 * 1000)

  return console.log('Congratulation!!!')
}

function addNewUser(userInfo) {
  return fetch(`http://localhost:4000/users/post`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userInfo), 
  })
  .then((response) => response.json())
}

const enter = document.getElementsByClassName('btn')
enter[0].onclick = registerNewUser

// export { findUser }
