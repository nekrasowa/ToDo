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

  
  return console.log('Congratulation!!!')
}


const enter = document.getElementsByClassName('btn');
enter[0].onclick = identifUser;