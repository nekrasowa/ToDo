'use strict'

import {
  createDiv
} from './function.js'

export function createBtn(
  noteId,
  name,
  mainArea,
  cb
) {
    const elem = createDiv()
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
