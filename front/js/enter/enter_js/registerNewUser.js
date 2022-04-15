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

  const userExist = await findUser(newUser)

  const [exist, massage1, url1, status1] = userExist

  if (status1.isOk == false) {
    return new Error('Problem on server, try later!')
  }
  if (exist == true) {
    console.log(new Error(massage1))

    // setTimeout(() => {
    //   window.location.href = url1;
    // }, 2 * 1000)

    return 
  }

  console.log(massage1)
  
  const userInDB = await addNewUser(newUser)

  const [massage2, url2, status2, id] = userInDB

  if (status2.isOk == false) {
    return new Error('Problem on server, try later!')
  }

  console.log(massage2)

  // setTimeout(() => {
  //   window.location.href = url2;
  // }, 2 * 1000)

  
  return console.log('Congratulation!!!')
}

export function findUser(userInfo) {
  const serialize = function(obj) {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  }
  const userInfoStr = serialize(userInfo)
  
  return fetch(`http://localhost:4000/users/get?${userInfoStr}`)
    .then((response) => response.json())
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


const enter = document.getElementsByClassName('btn');
enter[0].onclick = registerNewUser;