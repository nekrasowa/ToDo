'use strict';
function onPageLoaded () {
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
      ready: true
    }
  ]

  const newNote = document.querySelector('.newNoteArea');
  const headingNote = document.querySelector('.headingInput');
  const notes = document.querySelector('.notes');
  let noteId = 0;
  let editedNoteId;
  let deletedNoteId;
 

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
    return `note-${++noteId}`; 
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
      deletedNoteId = mainElem.getAttribute('id');
      const id = deletedNoteId.slice(5);

      console.log('id', id)

      console.log('deletedNoteId', deletedNoteId)

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
    });

    createBtn(note, btnBlock, 'ready', 'blacklighGreen', () => {
      if (notesText.style.backgroundColor !== 'rgb(131, 130, 133)') { 
        notesText.style.backgroundColor = 'rgb(131, 130, 133)';
        notesText.style.textDecoration = 'line-through';
        headingText.style.textDecoration = 'line-through';
        noteBlock.style.backgroundColor = 'rgb(131, 130, 133)';
        
        return
      }
      else {
      notesText.style.backgroundColor = 'rgb(114, 126, 153)';
      notesText.style.textDecoration = 'none';
      headingText.style.backgroundColor = 'rgb(131, 130, 133)';
      headingText.style.textDecoration = 'none';
      noteBlock.style.backgroundColor = 'rgb(114, 126, 153)';
      }; 

      clear();

      headingNote.focus();
    });

    clear();

    headingNote.focus();

    notes.scrollTop = notes.scrollHeight;

    const noteInJSON = addToJSON({
      heading,
      text,
      ready
    });

    saveInLocalStorage(noteInJSON);
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
    else {const currEditNote = elem.querySelector('.notesText');
    currEditNote.textContent = newNote.value;
    const currHeadingNote = elem.querySelector('.headingNote');
    currHeadingNote.textContent = headingNote.value;}; 
    
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
    return JSON.stringify(obj)
  }

  function saveInLocalStorage(noteInJSON) {
    localStorage.setItem(noteId, noteInJSON);
  }

  headingNote.focus()
}


document.addEventListener('DOMContentLoaded', onPageLoaded);
