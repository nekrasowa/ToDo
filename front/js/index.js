'use strict'
import {
  addArrOfOldNotes,
  addNewNote,
  deleteNote,
  changeStatus,
  saveChanges,
  // getStatus
} from './request.js'


// import {
//   getNotesFromLS
// } from './function.js'

import {
  lockedBtn
} from './lockedBtn.js'

import {
  unlockedBtn
} from './unlockedBtn.js'

import {
  applyReadyStyle,
  applyAnreadyStyle
} from './notesStyle.js'

const headingNote = document.querySelector('.headingInput')

async function onPageLoaded() {
  try {
    const userToken = localStorage.getItem('accessToken')
    const servUser = localStorage.getItem('accessToken')
    // const oldNotes = getNotesFromLS()
    const allNotesandIdArr = await addArrOfOldNotes(userToken)
    console.log('[oldNotesArr_ARR]', allNotesandIdArr[0])
    console.log('[oldNotesArr_ID]', allNotesandIdArr[1])

    const allNotes = allNotesandIdArr[0]
    const allId = allNotesandIdArr[1]

    const newNote = document.querySelector('.newNoteArea')
    const notes = document.querySelector('.notes')
    const allIdSet = new Set(allId) 
  
    let editedId

    allNotes.forEach(createNote)

    function clear() {
      document.querySelector('.headingInput').value = ''
      document.querySelector('.newNoteArea').value = ''
    }

    function createBtn(div, mainElem, name, blacklight, cb) {
      const btn = document.createElement('div')
      btn.classList.add('btn', name, blacklight, 'cursor')

      const srcSVG = `img/${name}.svg`
      const iconElem = new Image
      iconElem.src = srcSVG
      iconElem.classList.add('icon', `${name}-img`)
      iconElem.setAttribute('alt', `${name}Icon`)

      mainElem.appendChild(btn)
      btn.appendChild(iconElem)

      iconElem.onclick = (event) => {
        cb(div)
        event.stopPropagation()
      }
    } 

    function createId() {
      const maxId = Math.max(-1, ...allIdSet)

      const noteId = maxId + 1
      console.log('[noteId]:', noteId)

      allIdSet.add(noteId)
      console.log('[allIdSet]:', allIdSet)

      console.log('[id]:', noteId)
      return noteId
    }

    async function createNote(obj) {
        console.log('[Obj]', obj)
        const {
          heading = headingNote.value,
          text = newNote.value,
          ready = false,
          id = id ? id : createId(),
          // id,
          user = servUser
        } = { ...obj }

        if (!obj) {
          const objOfNote = {
            heading,
            text,
            ready,
            user
          }
          console.log('[objOfNote]:', objOfNote)

          const resalt = await addNewNote(objOfNote, userToken)
          console.log('[resaltOfAdded]', resaltOfAdded)
          
          const [resaltOfAdded, idAddedNote] = resalt
          console.log('[idAddedNote]', idAddedNote.id )

          const idOfNewNote = idAddedNote.id
          // objOfNote = obj.newNote
          console.log('[objOfNote]:', objOfNote)

          if (resaltOfAdded.isOk == false ) {
            return console.log('Ошибка на сервере. Попробуйте снова')
          }
          //TODO
        } 

        // console.log('id', idOfNewNote)
        const note = document.createElement('div')
        note.classList.add('note')
        
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

        if (ready == true) {
          applyReadyStyle(notesText, headingText, noteBlock)
        }

        notes.appendChild(note)
        note.appendChild(noteBlock)
        noteBlock.appendChild(headingText)
        noteBlock.appendChild(notesText)
        note.appendChild(btnBlock)
        headingText.append(newHeading)
        notesText.append(newText)

        createBtn(note, btnBlock, 'del', 'blacklighRed', async (mainElem) => {
          const noteId = mainElem.getAttribute('id')
          console.log('[noteID]:', noteId)
          const btn = mainElem.getElementsByClassName('btn del blacklighRed')

          lockedBtn(btn[0], 'blacklighRed')

          const resStatus = await deleteNote(noteId, userToken) 

          const unblBtn = mainElem.getElementsByClassName('btn del cursor')

          unlockedBtn(unblBtn[0], 'blacklighRed')

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
          console.log('[editedId]]', editedId)
          // editedNoteId = editedId.slice(5)
        });

        createBtn(note, btnBlock, 'ready', 'blacklighGreen', async (mainElem) => {
          const readyKey = mainElem.getAttribute('id')
          
          // const key = readyKey.slice(5)
          // const inf = getInfFromLS(key)
          const gray = 'rgb(131, 130, 133)'

          if (notesText.style.backgroundColor !== gray) {
            applyReadyStyle(notesText, headingText, noteBlock)
            mainElem.classList.add('status-ready')
            const btn = mainElem.getElementsByClassName('btn ready')
          
            lockedBtn(btn[0], 'blacklighGreen')

            await changeStatus(readyKey, true, userToken)
            
            unlockedBtn(btn[0], 'blacklighGreen')

            // inf.ready = true
            // const infJSON = addToJSON(inf)
            // saveInLocalStorage(key, infJSON)
            clear()
            headingNote.focus()
            return 
          }

          const btn = mainElem.getElementsByClassName('btn ready')

          lockedBtn(btn[0], 'blacklighGreen')

          await changeStatus(readyKey, false, userToken)

          unlockedBtn(btn[0], 'blacklighGreen')

          applyAnreadyStyle(notesText, headingText, noteBlock)
          mainElem.classList.remove('status-ready')

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
    }

    async function editNote() {
      try {
        const btnEdit = document.getElementById('editArea')
        btnEdit.style.display = 'none'
        const btnAdd = document.getElementById('addArea')
        btnAdd.style.display = 'block'
  
        const btn = document.getElementById(editedId)
  
        if (btn === null) {
          btnEdit.style.display = 'none'
          btnAdd.style.display = 'block'
          return
        }
  
        const currEditNote = btn.querySelector('.notesText')
        currEditNote.textContent = newNote.value
  
        const currHeadingNote = btn.querySelector('.headingNote')
        currHeadingNote.textContent = headingNote.value

        function getStatus(btn) {
          if (btn.classList.contains('status-ready') == true) {
            return true
          }
          return false
        }
        const status = getStatus(btn)
  
        lockedBtn(btnEdit, 'blackligh')

        await saveChanges(editedId, {
          heading: headingNote.value,
          text: newNote.value,
          ready: status,
          id: editedId
        }, userToken)

        unlockedBtn(btnEdit, 'blackligh')

        clear();
  
        headingNote.focus();
      } catch (err) {
        console.error(err)
      }
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


