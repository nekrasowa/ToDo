'use strict'

import {createDiv} from './function.js'
import {
  newNote,
  headingNote,
  notes,
  noteId
} from './index'
import {
  noteInJSON,
  saveInLocalStorage
} from './saveNotesLS.js'


export function createNoteBox(obj = {}) {
  const {
    heading = headingNote.value,
    text = newNote.value,
    ready = false
  } = obj

  const {
    id,
    strNoteId
  } = createId()

  const note = createDiv()
  note.classList.add('note')
  note.setAttribute('id', strNoteId)

  const noteBlock = createDiv()
  noteBlock.classList.add('noteBlock')

  const btnBlock = createDiv()
  btnBlock.classList.add('btnBlock')

  const headingText = createP()
  headingText.classList.add('headingNote')

  const notesText = createP()
  notesText.classList.add('notesText')

  const newHeading = heading
  const newText = text

  notes.appendChild(note)
  note.appendChild(noteBlock)
  noteBlock.appendChild(headingText)
  noteBlock.appendChild(notesText)
  note.appendChild(btnBlock)
  headingText.append(newHeading)
  notesText.append(newText)
   
  noteId++

  saveInLocalStorage(--noteId, noteInJSON);
  createId()

  return btnBlock
}

function createP() {
  return document.createElement('p')
}

export function createId() {
  const id = noteId
  const strNoteId = `note-${id}`

  // noteId++

  return {
    id,
    strNoteId
  }
}


