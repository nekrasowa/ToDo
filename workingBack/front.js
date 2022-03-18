'use strict'

const button1 = document.getElementById('button1')
const button2 = document.getElementById('button2')
const button3 = document.getElementById('button3')

button1.addEventListener("click" , firstReq)
const div = document.querySelector('div')

function firstReq() {
  return fetch('http://localhost:4000/1')
  .then(response => response.text())
  .then(function (text) {
    div.innerHTML += text
  })
}


function secondReq() {
  return fetch('http://localhost:4000/2')
  .then(response => response.text())
  .then(function (text) {
    div.innerHTML += text
  })
}


function thirdReq() {
  return fetch('http://localhost:4000/3')
  .then(response => response.text())
  .then(function (text) {
    div.innerHTML += text
  })
}




