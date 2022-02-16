'use strict'

const port = 'http://localhost:4000'

export function addArrOfOldNotes() {
  return fetch(port)
    .then((response) => response.json())
}

export function addNewNote(JSONobjOfNote) {
  console.log('request:', typeof JSONobjOfNote)
  return fetch(port, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSONobjOfNote, 
  })
  .then((response) => response.json)
}
