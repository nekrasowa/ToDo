'use strict'

import {getNotesFromLS} from './function.js'


function onPageLoaded () {

  const oldNotes = getNotesFromLS()
  console.log("oldNotes:", oldNotes)
  // console.log(Object.entries(localStorage))
  const notesData = [
    // {
    //   heading: 'Название первой заметки',
    //   text: 'Текст первой заметки',
    //   ready: false
    // },
    // {
    //   heading: 'Название второй заметки',
    //   text: 'Текст второй заметки',
    //   ready: false
    // },
    // {
    //   heading: 'Название третей заметки',
    //   text: 'Текст третей заметки',
    //   ready: false
    // }
  ]

  const newNote = document.querySelector('.newNoteArea')
  const headingNote = document.querySelector('.headingInput')
  const notes = document.querySelector('.notes')
  let noteId = 0
  let editedNoteId
  let editedNoteId2
  let deletedKey
  let inf
  let infJSON
  let readyKey
 

  function clear () {
    document.querySelector('.headingInput').value = '';
    document.querySelector('.newNoteArea').value = '';
  }

  function createBtn(div, mainElem, name, blacklight, cb) {
    const elem = document.createElement('div');
    elem.classList.add(name);
    elem.classList.add(blacklight);

    const srcSVG = `img/${name}.svg`;
    const iconElem = new Image;
    iconElem.src = srcSVG;
    iconElem.classList.add('icon', `${name}-img`);
    iconElem.setAttribute('alt', `${name}Icon`);

    mainElem.appendChild(elem);
    elem.appendChild(iconElem);

    elem.onclick = () => {
      cb(div);
    };
  }

  function createId() {
    return `note-${noteId++}`; 
  }

  function createNote(obj = {}) {
    const {
      heading = headingNote.value,
      text = newNote.value,
      ready = false
    } = obj

    const note = document.createElement('div');
    note.classList.add('note');
    note.setAttribute('id', createId());

    const noteBlock = document.createElement('div');
    noteBlock.classList.add('noteBlock');

    const btnBlock = document.createElement('div');
    btnBlock.classList.add('btnBlock');

    const headingText = document.createElement('p');
    headingText.classList.add('headingNote');
    const notesText = document.createElement('p');
    notesText.classList.add('notesText');
    
    const newHeading = heading;
    const newText = text;

    notes.appendChild(note);
    note.appendChild(noteBlock);
    noteBlock.appendChild(headingText);
    noteBlock.appendChild(notesText);
    note.appendChild(btnBlock);
    headingText.append(newHeading);
    notesText.append(newText);

    createBtn(note, btnBlock, 'del', 'blacklighRed', (mainElem) => {   
      deletedKey = mainElem.getAttribute('id');
      const id = deletedKey.slice(5);

      localStorage.removeItem(id);
      mainElem.remove();
    });
    
    createBtn(note, btnBlock, 'edit', 'blacklighYelow', (mainElem) => {
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
    });

    createBtn(note, btnBlock, 'ready', 'blacklighGreen', (mainElem) => {
      if (notesText.style.backgroundColor !== 'rgb(131, 130, 133)') { 
        notesText.style.backgroundColor = 'rgb(131, 130, 133)';
        notesText.style.textDecoration = 'line-through';
        headingText.style.textDecoration = 'line-through';
        noteBlock.style.backgroundColor = 'rgb(131, 130, 133)';

        readyKey = mainElem.getAttribute('id');
        const key = readyKey.slice(5);

        getInfFromLS(key);
        inf.ready = true;
        addToJSON(inf);
        saveInLocalStorage(key, infJSON);
          
        return
      }
      else {
        notesText.style.backgroundColor = 'rgb(114, 126, 153)';
        notesText.style.textDecoration = 'none';
        headingText.style.backgroundColor = 'rgb(131, 130, 133)';
        headingText.style.textDecoration = 'none';
        noteBlock.style.backgroundColor = 'rgb(114, 126, 153)';

        readyKey = mainElem.getAttribute('id');
        const key = readyKey.slice(5);

        getInfFromLS(key);
        inf.ready = false;
        addToJSON(inf);
        saveInLocalStorage(key, infJSON);
      }; 

      clear();

      headingNote.focus();
      notes.scrollTop = notes.scrollHeight;
      const noteInJSON = addToJSON({
        heading,
        text,
        ready
      });

      saveInLocalStorage(--noteId, noteInJSON);
      createId()
      console.log(noteInJSON)
    });

    clear();
    headingNote.focus();
    notes.scrollTop = notes.scrollHeight;

    const noteInJSON = addToJSON({
      heading,
      text,
      ready
    });

    saveInLocalStorage(--noteId, noteInJSON);
    createId()
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
    
    clear();

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

  function addToJSON(obj) {
    return infJSON = JSON.stringify(obj)
  }

  function saveInLocalStorage(id, noteInJSON) {
    localStorage.setItem(id, noteInJSON);
  }

  function getInfFromLS(id){
    const rawInf = localStorage.getItem(id);
    inf = JSON.parse(rawInf);
  } 

  headingNote.focus()
}



document.addEventListener('DOMContentLoaded', onPageLoaded);
