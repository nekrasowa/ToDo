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
     
    deletedNoteId = mainElem.getAttribute('id');
    const id = deletedNoteId.slice(5);


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