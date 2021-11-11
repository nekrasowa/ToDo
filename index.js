'use strict';
function onPageLoaded () {
  const notesData = [
    {
      heading: 'Первая заметка',
      text: 'Текст первой заметки',
      ready: folse
    },
    {
      heading: 'Вторая заметка',
      text: 'Текст второй заметки',
      ready: folse
    }
  ]



  const newNote = document.querySelector('.newNoteArea');
  const headingNote = document.querySelector('.headingInput');
  const notes = document.querySelector('.notes');
  let noteId = 0;
  let editedNoteId;

  function clear () {
    document.querySelector('.headingInput').value = '';
    document.querySelector('.newNoteArea').value = '';
  }

  function createBtn(mainElem, name, blacklight, cb) {
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
      cb(mainElem);
    };
  }

  function createId() {
    return `note-${noteId++}`; 
  }

  function createNote() {
    const note = document.createElement('div');
    note.classList.add('note');
    note.setAttribute('id', createId());

    const headingText = document.createElement('p');
    headingText.classList.add('headingNote');
    const notesText = document.createElement('p');
    notesText.classList.add('notesText');
    
    const newText = newNote.value;
    const newHeading = headingNote.value;

    notes.appendChild(note);
    note.appendChild(headingText);
    note.appendChild(notesText);
    notesText.append(newText);
    headingText.append(newHeading);

    createBtn(note, 'del', 'blacklighRed', (mainElem) => {
      mainElem.remove();
    });
    
    createBtn(note, 'edit', 'blacklighYelow', (mainElem) => {
      const editNote = mainElem.querySelector('.notesText');
      const editHeading = mainElem.querySelector('.headingNote');
      newNote.value = editNote.textContent;
      headingNote.value = editHeading.textContent;

      const btnEdit = document.getElementById('editArea');
      btnEdit.style.display = 'block';
      const btnAdd = document.getElementById('addArea');
      btnAdd.style.display = 'none';
      
      editNote.textContent = '';
      editHeading.textContent = '';

      editedNoteId = mainElem.getAttribute('id');
    });

    createBtn(note, 'ready', 'blacklighGreen', () => {
      if (notesText.style.backgroundColor !== 'gray' 
          && headingText.style.backgroundColor !== 'gray') {
        notesText.style.backgroundColor = 'gray';
        notesText.style.textDecoration = 'line-through';
        headingText.style.backgroundColor = 'gray';
        headingText.style.textDecoration = 'line-through';
        
        return
      }

      notesText.style.backgroundColor = '#818E7F';
      notesText.style.textDecoration = 'none';
      headingText.style.backgroundColor = '#918F82';
      headingText.style.textDecoration = 'none';
    });

    clear();

    headingNote.focus();
  }

  function editNote() {
    const elem = document.getElementById(editedNoteId);
    const editNote = elem.querySelector('.notesText');
    editNote.textContent = newNote.value;
    const currHeadingNote = elem.querySelector('.headingNote');
    currHeadingNote.textContent = headingNote.value;
    
    const btnEdit = document.getElementById('editArea');
    btnEdit.style.display = 'none';
    const btnAdd = document.getElementById('addArea');
    btnAdd.style.display = 'block';

    clear();

    headingNote.focus();
  }

  const add = document.getElementById('addArea');
  add.onclick = createNote;

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
}


document.addEventListener('DOMContentLoaded', onPageLoaded);


