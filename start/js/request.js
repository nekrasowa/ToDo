'use strict'

export function addArrOfOldNotes() {
  return fetch('http://localhost:4000')
    .then((response) => response.json())
}


