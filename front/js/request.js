'use strict'

const url = new URL('http://localhost:4000')
const addURL = new URL('/add', url)
const deleteURL = new URL('/delete', url)
const statusURL = new URL('/changeStatus', url)
// const getStatusURL = new URL('/getStatus', url)
const changesURL = new URL('/saveChanges', url)

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
  return fetch(statusURL, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ noteId, status }), 
  })
  .then((response) => response.json())
}

export function saveChanges(noteId, obj) {
  return fetch(changesURL, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ noteId, obj }), 
  })
  .then((response) => response.json())
}

export function getStatus(noteId) {
  return fetch(`http://localhost:4000/getStatus?noteId=${noteId}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  })
  .then((response) => response.json())
}
