'use strict'

const url = new URL('http://localhost:4000')
const getURL = new URL('/notes/get', url)
const addURL = new URL('/notes/add', url)
const deleteURL = new URL('/notes/delete', url)
const statusURL = new URL('/notes/changeStatus', url)
// const getStatusURL = new URL('/getStatus', url)
const changesURL = new URL('/notes/saveChanges', url)

export function addArrOfOldNotes(token) {
  console.log('[token]',token )
  return fetch(getURL, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      // 'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((response) => response.json())
}

export function addNewNote(JSONobjOfNote, token) {
  return fetch(addURL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(JSONobjOfNote)
  })
  .then((response) => response.json())
}

export function deleteNote(noteId, token) {
  return fetch(deleteURL, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ noteId }), 
  })
  .then((response) => response.json())
}

export function changeStatus(noteId, status, token) {
  return fetch(statusURL, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ noteId, status }), 
  })
  .then((response) => response.json())
}

export function saveChanges(noteId, obj, token) {
  return fetch(changesURL, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ noteId, obj }), 
  })
  .then((response) => response.json())
}

// export function getStatus(noteId) {
//   return fetch(`http://localhost:4000/getStatus?noteId=${noteId}`, {
//     method: 'GET',
//     headers: {
//       'Accept': 'application/json'
//     }
//   })
//   .then((response) => response.json())
// }
