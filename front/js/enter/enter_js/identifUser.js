'use strict'

import {
  findUser
} from './registerNewUser.js'

async function identifUser() {
  console.log('[connectStartIdent]')

  const login = document.querySelector('.login')
  const password = document.querySelector('.password')

  const identifiableUser = {
    name: login.value,
    password: password.value
  }
  console.log('[User]', identifiableUser)

  const userFromDB = await findUser(identifiableUser)
  console.log('[userFromDB]', userFromDB)

  const [exist, massage, url, status, id] = userFromDB

  const notesPageUrl = '../../index.html'

  setTimeout(() => {
      window.location.href = notesPageUrl
    }, 2 * 1000)
  return console.log('Congratulation!!!')
}


const enter = document.getElementsByClassName('btn');
enter[0].onclick = identifUser;