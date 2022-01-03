'use strict'

export function getNotesFromLS() {
  let oldNotes = []

  for (let i = 0; i < localStorage.length; i++) {
    let obj = JSON.parse(localStorage.getItem(i))
    oldNotes.push(obj)
  }

  return oldNotes
}
