'use strict'


export function createBtn (
  noteId,
  name,
  mainArea,
  cb
) {
    const elem = document.createElement('div')
    addClasses(elem, name)
    const iconElem = addIcons(noteId, name)

    mainArea.appendChild(elem)
    elem.appendChild(iconElem)

    elem.onclick = (e) => cb(noteId, e)
  }

function addClasses(elem, name) {
  elem.classList.add(name)
  elem.classList.add(`${name}blacklight`)
}
function addIcons(noteId, name) {
  const srcSVG = `img/${name}.svg`
  const iconElem = new Image
  iconElem.src = srcSVG
  iconElem.classList.add('icon', `${name}-img`)
  iconElem.setAttribute('alt', `${name}Icon`)
  iconElem.setAttribute('data-id', noteId)

  return iconElem
}

export function clearTextArea() {
  document.querySelector('.headingInput').value = '';
  document.querySelector('.newNoteArea').value = '';
}

export function delBtnHandler(noteId) {
  const delNoteId = fullNoteId(noteId)
  const deletedNote = document.getElementById(delNoteId)
  deletedNote.remove()
  localStorage.removeItem(noteId)
}

function fullNoteId(id) {
  return `note-${id}`
}
