'use strict'
import {
  addArrOfOldNotes,
  addNewNote,
  deleteNote,
  changeStatus,
  saveChanges,
  getStatus
} from './request.js'

// import {
//   getNotesFromLS
// } from './function.js'

import {
  locedBtn
} from './locedBtn.js'


import {
  applyReadyStyle,
  applyAnreadyStyle
} from './notesStyle.js'

const headingNote = document.querySelector('.headingInput')

async function onPageLoaded() {
  try {
    // const oldNotes = getNotesFromLS()
    const oldNotesArr = await addArrOfOldNotes()

    const newNote = document.querySelector('.newNoteArea')
    const notes = document.querySelector('.notes')
    const allIdSet = new Set([1]) 
    // TODO: изменить число на -1, когда не будет массива на сервере
    // let editedNoteId
    let editedId

    oldNotesArr.forEach(createNote)

    function clear() {
      document.querySelector('.headingInput').value = ''
      document.querySelector('.newNoteArea').value = ''
    }

    function createBtn(div, mainElem, name, blacklight, cb) {
      const elem = document.createElement('div')
      elem.classList.add(name)
      elem.classList.add(blacklight)
      elem.classList.add('cursor')

      const srcSVG = `img/${name}.svg`
      const iconElem = new Image
      iconElem.src = srcSVG
      iconElem.classList.add('icon', `${name}-img`)
      iconElem.setAttribute('alt', `${name}Icon`)

      mainElem.appendChild(elem)
      elem.appendChild(iconElem)

      elem.onclick = () => {
        locedBtn(elem, )
        cb(div)
      }
    }

    function createId() {
      const maxId = Math.max(...allIdSet)

      console.log(allIdSet)
      const noteId = maxId + 1
      allIdSet.add(noteId)

      return `note-${noteId}`
    }

    function createNote(obj) {
      // console.log(obj.id)
      const {
        heading = headingNote.value,
        text = newNote.value,
        ready = 'false',
        id = id ? id : createId()
      } = { ...obj }

      const note = document.createElement('div')
      note.classList.add('note')
      // const currKey = localKey
      //   ? `note-${localKey}`
      //   : createId()
      note.setAttribute('id', id)

      const noteBlock = document.createElement('div')
      noteBlock.classList.add('noteBlock')

      const btnBlock = document.createElement('div')
      btnBlock.classList.add('btnBlock')

      const headingText = document.createElement('p')
      headingText.classList.add('headingNote')
      const notesText = document.createElement('p')
      notesText.classList.add('notesText')

      const newHeading = heading
      const newText = text

      if (ready == 'true') {
        applyReadyStyle(notesText, headingText, noteBlock)
      }

      notes.appendChild(note)
      note.appendChild(noteBlock)
      noteBlock.appendChild(headingText)
      noteBlock.appendChild(notesText)
      note.appendChild(btnBlock)
      headingText.append(newHeading)
      notesText.append(newText)

      createBtn(note, btnBlock, 'del', 'blacklighRed', (mainElem) => {
        const noteId = mainElem.getAttribute('id')
        deleteNote(noteId)
        // const deletedKey = mainElem.getAttribute('id')
        // const id = deletedKey.slice(5)
        // localStorage.removeItem(id)
        mainElem.remove()
      })

      createBtn(note, btnBlock, 'edit', 'blacklighYelow', (mainElem) => {
        const editNote = mainElem.querySelector('.notesText')
        const editHeading = mainElem.querySelector('.headingNote')
        newNote.value = editNote.textContent
        headingNote.value = editHeading.textContent

        const btnEdit = document.getElementById('editArea') //TODO: функция
        btnEdit.style.display = 'block'
        const btnAdd = document.getElementById('addArea')
        btnAdd.style.display = 'none'

        editedId = mainElem.getAttribute('id')
        // editedNoteId = editedId.slice(5)
      });

      createBtn(note, btnBlock, 'ready', 'blacklighGreen', (mainElem) => {
        const readyKey = mainElem.getAttribute('id')

        // const key = readyKey.slice(5)
        // const inf = getInfFromLS(key)
        const gray = 'rgb(131, 130, 133)'

        if (notesText.style.backgroundColor !== gray) {
          applyReadyStyle(notesText, headingText, noteBlock)

          changeStatus(readyKey, 'true')
          // inf.ready = true
          // const infJSON = addToJSON(inf)
          // saveInLocalStorage(key, infJSON)
          clear()
          headingNote.focus()
          return 
        }
        changeStatus(readyKey, 'false')
        applyAnreadyStyle(notesText, headingText, noteBlock)

        // inf.ready = false
        // const infJSON = addToJSON(inf)
        // saveInLocalStorage(key, infJSON)

        clear()
        headingNote.focus()
      })


      // const noteInJSON = addToJSON({
      //   heading,
      //   text,
      //   ready
      // });

      // const id = note.getAttribute('id')
      // const noteId = id.slice(5)

      // saveInLocalStorage(noteId, noteInJSON)

      clear()
      headingNote.focus()
      notes.scrollTop = notes.scrollHeight

      if (!obj) {
        const objOfNote = {
          heading,
          text,
          ready,
          id
          // heading = newHeading,
          // text = newText,
          // ready: false 
        }
        // const JSONobjOfNote = JSON.stringify(objOfNote)
        addNewNote(objOfNote)
        // console.log(JSONobjOfNote)

      }
    }

    function editNote() {
      const btnEdit = document.getElementById('editArea')
      btnEdit.style.display = 'none'
      const btnAdd = document.getElementById('addArea')
      btnAdd.style.display = 'block'

      const elem = document.getElementById(editedId)

      if (elem === null) {
        btnEdit.style.display = 'none'
        btnAdd.style.display = 'block'

        return
      }

      const currEditNote = elem.querySelector('.notesText')
      currEditNote.textContent = newNote.value

      const currHeadingNote = elem.querySelector('.headingNote')
      currHeadingNote.textContent = headingNote.value

      const statusNote = getStatus(editedId)
      console.log('[statusNote]', statusNote, typeof statusNote)


      saveChanges(editedId, {
          heading: headingNote.value,
          text: newNote.value,
          ready: statusNote,
          id: editedId
        })

      // saveInLocalStorage(editedNoteId, JSON.stringify({
      //   heading: headingNote.value,
      //   text: newNote.value,
      //   ready: false
      // }))

      clear();

      headingNote.focus();
    }

    const add = document.getElementById('addArea');
    add.onclick = (e) => createNote();

    newNote.addEventListener('keyup', function (event) {
      if (event.key == 'Enter' && event.shiftKey) {
        createNote();
      }
    });

    headingNote.addEventListener('keyup', function (event) {
      if (event.key == 'Enter' && event.shiftKey) {
        createNote();
      }
    });

    const edit = document.getElementById('editArea');
    edit.onclick = editNote;

    // function addToJSON(obj) {
    //   return JSON.stringify(obj)
    // }

    // function saveInLocalStorage(id, noteInJSON) {
    //   localStorage.setItem(id, noteInJSON);
    // }

    // function getInfFromLS(id) {
    //   const rawInf = localStorage.getItem(id);

    //   return JSON.parse(rawInf);
    // }

    headingNote.focus()
  } catch (err) {
    console.error(err)
  }
}

document.addEventListener('DOMContentLoaded', () => {
  onPageLoaded()
  headingNote.focus()
});


