'use strict'

// export function handlerOfBtnDel() {
//   const deletedKey = this.getAttribute('id')
//   console.log("deletedKey", deletedKey)

//   const id = deletedKey.slice(5)

//   localStorage.removeItem(id)
//   this.remove()
// }

// document.querySelector('icon').onclick = function getNote() {
  
// }

document.addEventListener('click', getId)

function getId(e) {
  // const obj = this.toString()
  // console.log('[typeof obj]:', typeof obj)
  // obj.slice(13)
  console.log('[e]:', e)
  console.log('[className]:', e.target.className)

  // 13
}


export function createBtn(noteId,
                          name,
                          mainArea,
                          cb) {
    const elem = document.createElement('div')
    addClasses(elem, name)
    const iconElem = addIcons(noteId, name)

    mainArea.appendChild(elem)
    elem.appendChild(iconElem)

    elem.onclick = cb
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
  iconElem.classList.add(noteId)

  return iconElem
}

export function clearTextArea() {
// (selectors = ['.headingInput', '.newNoteArea']) {
  document.querySelector('.headingInput').value = '';
  document.querySelector('.newNoteArea').value = '';
  // for (const selector of selectors) {
  //   document.querySelector(selector).value = ''
  // }
}
