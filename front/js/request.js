'use strict'

const host = 'http://localhost:4000'

export function addArrOfOldNotes() {
  return fetch(host)
    .then((response) => response.json())
}

// export function addNewNote() {
//   fetch(host, {
//     method: 'POST',
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: string, 
//   })
//   .then((response) => response.json)
// }
