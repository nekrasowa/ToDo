'use strict'

const button = document.getElementById('button')
console.log('[button]:', button)
button.addEventListener("click" , firstReq)
const div = document.querySelector('div')

function firstReq() {
  fetch('http://localhost:8000')
  .then(response => response.text())
  .then(function (text) {
    div.innerHTML += text
  })
}



