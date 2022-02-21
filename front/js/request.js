'use strict'

const url = new URL('http://localhost:4000')
const addURL = new URL('/add', url)
const deleteURL = new URL('/delete', url)
const statusURLFalse = new URL('/status/false', url)
const statusURLTrue = new URL('/status/true', url)

console.log('[deleteURL]:', deleteURL.toString())

export function addArrOfOldNotes() {
  return fetch(url)
    .then((response) => response.json())
}

export function addNewNote(JSONobjOfNote) {
  return fetch(addURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(JSONobjOfNote), 
  })
  .then((response) => response.json())
}

export function deleteNote(noteId) {
  return fetch(deleteURL, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ noteId }), 
  })
  .then((response) => response.json())
}

export function changeStatus(noteId, status) {
  return fetch(statusURLFalse, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ noteId, status }), 
  })
  .then((response) => response.json())
}
