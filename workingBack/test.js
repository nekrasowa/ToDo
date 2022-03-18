'use strict'

console.log('[START-0]')

const promise = new Promise((resolve, reject) => {
  console.log('[async]')
  setTimeout(() => {
    resolve({ state: 'test'})
  }, 3000)
})

console.log('[START-1]', promise)

promise.then((result) => {
  console.log('[then]', result)

  return new Promise((resolve) => setTimeout(() => resolve(result), 5000))
}).then((res) => {
  console.log('[res-2]:', res)
})

console.log('[START-9]')
