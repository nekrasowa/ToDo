'use strict'

import {
  clearTextArea,
  readyBtnHandler,
  createId,
  scrollTop
} from './function.js'

import {createBtn} from './createBtn.js'
import {createNoteBox} from './createNoteBox.js'
import {delBtnHandler} from './delBtnHandler.js'
import {
  addToJSON,
  saveInLocalStorage
} from './saveNotesLS.js'

export const newNote = document.querySelector('.newNoteArea');
export const headingNote = document.querySelector('.headingInput');
export const notes = document.querySelector('.notes');

export let noteId = 0 
let editedNoteId;
let editedNoteId2;
let inf; 
export let infJSON;
let readyKey;

function onPageLoaded () {
  // console.log(Object.entries(localStorage))
  const notesData = [
    {
      heading: 'Название первой заметки',
      text: 'Текст первой заметки',
      ready: false
    },
    {
      heading: 'Название второй заметки',
      text: 'Текст второй заметки',
      ready: false
    },
    {
      heading: 'Название третей заметки',
      text: 'Текст третей заметки',
      ready: false
    }
  ]

  function createNote(obj = {}) {
    const btnBlock = createNoteBox(obj = {})

    createBtn(
      noteId,
      'del', 
      btnBlock,
      delBtnHandler
      )
    
    createBtn(
      noteId,
              'edit', 
              btnBlock, 
              (mainElem) => {
      const editNote = mainElem.querySelector('.notesText');
      const editHeading = mainElem.querySelector('.headingNote');
      newNote.value = editNote.textContent;
      headingNote.value = editHeading.textContent;

      const btnEdit = document.getElementById('editArea');
      btnEdit.style.display = 'block';
      const btnAdd = document.getElementById('addArea');
      btnAdd.style.display = 'none';
      
      editedNoteId = mainElem.getAttribute('id');
      editedNoteId2 = editedNoteId.slice(5);
      
      getInfFromLS(editedNoteId2);
    })

    //TODO:
    createBtn(
      noteId, 
      'ready', 
      btnBlock, 
      (mainElem) => {
          // if (notesText.style.backgroundColor !== 'rgb(131, 130, 133)') { 
          //   notesText.style.backgroundColor = 'rgb(131, 130, 133)';
          //   notesText.style.textDecoration = 'line-through';
          //   headingText.style.textDecoration = 'line-through';
          //   noteBlock.style.backgroundColor = 'rgb(131, 130, 133)';
        
          //   readyKey = mainElem.getAttribute('id');
          //   const key = readyKey.slice(5);
        
          //   getInfFromLS(key);
          //   inf.ready = true;
          //   addToJSON(inf);
          //   saveInLocalStorage(key, infJSON);
              
          //   return
          // }
          // else {
          //   notesText.style.backgroundColor = 'rgb(114, 126, 153)';
          //   notesText.style.textDecoration = 'none';
          //   headingText.style.backgroundColor = 'rgb(131, 130, 133)';
          //   headingText.style.textDecoration = 'none';
          //   noteBlock.style.backgroundColor = 'rgb(114, 126, 153)';
        
          //   readyKey = mainElem.getAttribute('id');
          //   const key = readyKey.slice(5);
        
          //   getInfFromLS(key);
          //   inf.ready = false;
          //   addToJSON(inf);
          //   saveInLocalStorage(key, infJSON);
          // }
    })

    clearTextArea();
    headingNote.focus();
    scrollTop()

    // const noteInJSON = addToJSON({
    //   heading,
    //   text,
    //   ready
    // });
     
    // noteId++

    // saveInLocalStorage(--noteId, noteInJSON);
    // createId()
  }

  for (const obj of notesData) {
    createNote(obj);
  }

  function editNote() {
    const elem = document.getElementById(editedNoteId);

    const btnEdit = document.getElementById('editArea');
    btnEdit.style.display = 'none';
    const btnAdd = document.getElementById('addArea');
    btnAdd.style.display = 'block';

    if (elem === null) {
      btnEdit.style.display = 'none';
      btnAdd.style.display = 'block';
    } 
    else {
      const currEditNote = elem.querySelector('.notesText');
      currEditNote.textContent = newNote.value;
      const currHeadingNote = elem.querySelector('.headingNote');
      currHeadingNote.textContent = headingNote.value;
    };

    saveInLocalStorage(editedNoteId2, JSON.stringify({
      heading: headingNote.value,
      text: newNote.value,
      ready: false
    }));
    
    clearTextArea();

    headingNote.focus();
  }

  const add = document.getElementById('addArea');
  add.onclick = (e) => createNote();

  newNote.addEventListener('keyup', function(event) {
    if (event.key == 'Enter' && event.shiftKey) {
    createNote();
    }
  });

  headingNote.addEventListener('keyup', function(event) {
    if (event.key == 'Enter' && event.shiftKey) {
    createNote();
    }
  });

  const edit = document.getElementById('editArea');
  edit.onclick = editNote;

  function getInfFromLS(id){
    const rawInf = localStorage.getItem(id);
    inf = JSON.parse(rawInf);
  } 

  headingNote.focus()

}

document.addEventListener('DOMContentLoaded', onPageLoaded);