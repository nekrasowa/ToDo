'use strict'

console.log('[START-0]')

function timeout(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123)
    }, time)
  } 
)}

const promise = () => timeout(8000)

async function nextStart() {
  await timeout(3000)
  console.log('[async]')
  await timeout(5000)
  console.log('[START-1]')
  const num = await promise()
  console.log('[then]', num)
}

nextStart()
