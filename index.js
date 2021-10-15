'use strict';
function onPageLoaded () {
  const newNote = document.querySelector('.newNoteArea');
  const notes = document.querySelector('.notes');
  let noteId = 0;
  let editedNoteId;

  function clear () {
    document.querySelector('.newNoteArea').value = '';
  }

  function createBtn(mainElem, name, cb) {
    const elem = document.createElement('div');
    elem.classList.add(name);
    const srcImg = `img/${name}.png`;
    const iconElem = new Image();
    iconElem.src = srcImg;
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

    const notesText = document.createElement('p');
    notesText.classList.add('notesText');
    
    const newText = newNote.value;
    notesText.append(newText);
    notes.appendChild(note);
    note.appendChild(notesText)

    createBtn(note, 'del', (mainElem) => {
      mainElem.remove();
    });
    
    createBtn(note, 'edit', (mainElem) => {
      const editNote = mainElem.querySelector('.notesText');
      newNote.value = editNote.textContent;

      const btnEdit = document.getElementById('edit');
      btnEdit.style.display = 'block';
      const btnAdd = document.getElementById('add');
      btnAdd.style.display = 'none';
      
      editNote.textContent = '';

      editedNoteId = mainElem.getAttribute('id');
    });

    createBtn(note, 'ready', () => {
      if (notesText.style.backgroundColor !== 'gray') {
        notesText.style.backgroundColor = 'gray';
        notesText.style.textDecoration = 'line-through';

        return
      }

      notesText.style.backgroundColor = 'aquamarine';
      notesText.style.textDecoration = 'none';
    });

    clear();

    newNote.focus();
  }

  function editNote() {
    const elem = document.getElementById(editedNoteId);
    const editNote = elem.querySelector('.notesText');
    editNote.textContent = newNote.value;
    
    const btnEdit = document.getElementById('edit');
    btnEdit.style.display = 'none';
    const btnAdd = document.getElementById('add');
    btnAdd.style.display = 'block';

    clear();

    newNote.focus();
  }

  const add = document.getElementById('add');
  add.onclick = createNote;

  const edit = document.getElementById('edit');
  edit.onclick = editNote;
}


document.addEventListener('DOMContentLoaded', onPageLoaded);
