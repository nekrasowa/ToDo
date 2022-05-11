'use strict'

// import {
//   findUser
// } from './registerNewUser.js'

const serialize = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function checkUser(userInfo) {
  const userInfoStr = serialize(userInfo)
  
  return fetch(`http://localhost:4000/users/get/check?${userInfoStr}`)
    .then((response) => response.json())
}

async function identifUser() {
  console.log('[connectStartIdent]')

  const login = document.querySelector('.login')
  const password = document.querySelector('.password')

  const identifiableUser = {
    email: login.value,
    password: password.value
  }

  // const userInfoStr = serialize(identifiableUser)
  const protectedURL = 'file:///Users/codecare/projects/ludochka/ToDo/ToDoSQL/front/index.html'

  console.log('[User]', identifiableUser)

  const [statusServ, identifStatus, accessToken] = await checkUser(identifiableUser)

  if (statusServ === false) {
    console.log('An error has occurred, please try again.')
    return
  }

  if (identifStatus === false) {
    console.log('Invalid username or password, check the data or register.')
    return
  }
  console.log('[accessToken]', accessToken)
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('servUser', login.value)

  setTimeout(() => {
      window.location.href = protectedURL
    }, 5 * 1000)

  return console.log('Congratulation!!!')
}

const enter = document.getElementsByClassName('btn');
enter[0].onclick = identifUser;