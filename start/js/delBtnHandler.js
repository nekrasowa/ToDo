'use strict'

import {fullNoteId} from './function.js'

export function delBtnHandler(noteId) {
  const delNoteId = fullNoteId(noteId)
  const deletedNote = document.getElementById(delNoteId)
  deletedNote.remove()
  localStorage.removeItem(noteId)
}