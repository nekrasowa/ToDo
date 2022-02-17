'use strict'

const port = new URL('http://localhost:4000')
const addPort = new URL('/add', port)
const deletePort = new URL('/delete', port)
console.log('[deletePort]:', deletePort.toString())

export function addArrOfOldNotes() {
  return fetch(port)
    .then((response) => response.json())
}

export function addNewNote(JSONobjOfNote) {
  return fetch(addPort, {
    method: 'POST',
    // url: port,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(JSONobjOfNote), 
  })
  .then((response) => response.json())
}

export function deleteNote(noteId) {
  console.log('[noteId]:', noteId)
  return fetch(deletePort, {
    method: 'DELETE',
    // url: port,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ noteId }), 
  })
  .then((response) => response.json())
}
