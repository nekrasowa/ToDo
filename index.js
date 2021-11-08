'use strict';
function onPageLoaded () {
  const newNote = document.querySelector('.newNoteArea');
  const headingNote = document.querySelector('.headingInput');
  const notes = document.querySelector('.notes');
  let noteId = 0;
  let editedNoteId;

  function clear () {
    document.querySelector('.headingInput').value = '';
    document.querySelector('.newNoteArea').value = '';
  }
// TODO d1, d2
  function createBtn(mainElem, name, blacklight, cb) {
    const elem = document.createElement('div');
    elem.classList.add(name);
    elem.classList.add(blacklight);

    const srcSVG = `img/${name}.svg`;
    const iconElem = new Image;
    iconElem.src = srcSVG;
    iconElem.classList.add('icon', `${name}-img`);
    iconElem.setAttribute('alt', `${name}Icon`);

    
    // const srcImg = `img/${name}.png`;
    // const iconElem = new Image();
    // iconElem.src = srcImg;
    // iconElem.classList.add('icon', `${name}-img`);
    // iconElem.setAttribute('alt', `${name}Icon`);
    
    // const boxWidth = 50;
    // const boxHeight = 50;

    // const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // svg.setAttributeNS(null,'viewBox', '0 0 ' + boxWidth + ' ' + boxHeight);
    // svg.setAttributeNS(null,'width', boxWidth);
    // svg.setAttributeNS(null,'height', boxHeight); 
    // svg.setAttributeNS(null,'id', `${name}`); 
    // svg.classList.add('icon');
    // svg.setAttributeNS('xmlns', 'http://www.w3.org/2000/svg');

    // // const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    // // const style = document.createElement('style');
    // // style.setAttribute(.cls-1{fill:#111}.cls-2{fill:#750303});
    
    // const title = document.createElement('title');
    // title.setAttribute(`${name}`);

    // const path_1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // path_1.setAttributeNS('d', `${d1}`);
    // path_1.style.fill="#111";
    // const path_2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // path_2.setAttributeNS('d', `${d2}`);
    // path_2.style.fill="#750303";    


    // // const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // // g.setAttribute('id', `${name}`);

    // // const path_1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // // path_1.setAttribute('d', `${d1}`);
    // // path_1.setAttribute('fill', '#111')
    // // const path_2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // // path_2.setAttribute('d', `${d2}`);
    // // path_1.setAttribute('fill', '#750303');

    // mainElem.appendChild(elem);
    // elem.appendChild(svg);
    // svg.appendChild(defs);
    // defs.appendChild(style);
    // svg.appendChild(title);
    // svg.appendChild(path_1);
    // svg.appendChild(path_2);
    
    // // svg.appendChild(g);
    // // svg.appendChild(path_1);
    // // svg.appendChild(path_2);

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
    // }, 'M22.25 0h-5.5A2.75 2.75 0 0 0 14 2.75V5H2.5a2.5 2.5 0 0 0 0 5H31v33.25A1.76 1.76 0 0 1 29.25 45H9.75A1.76 1.76 0 0 1 8 43.25V17.5a2.5 2.5 0 1 0-5 0v25.75A6.75 6.75 0 0 0 9.75 50h19.5A6.75 6.75 0 0 0 36 43.25V10h.5a2.5 2.5 0 0 0 0-5H25V2.75A2.75 2.75 0 0 0 22.25 0z', 'M15.5 15a2.5 2.5 0 0 0-2.5 2.5v21a2.5 2.5 0 0 0 5 0v-21a2.5 2.5 0 0 0-2.5-2.5zM23.5 15a2.5 2.5 0 0 0-2.5 2.5v21a2.5 2.5 0 0 0 5 0v-21a2.5 2.5 0 0 0-2.5-2.5z');
    
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
    // }, 'M34.5 7L26.35.6a2.81 2.81 0 0 0-4 .47l-18.9 24A2.93 2.93 0 0 0 3 26.2L.23 38.07a2.79 2.79 0 0 0 1 2.84 2.75 2.75 0 0 0 3 .3l10.9-5.45a2.86 2.86 0 0 0 .95-.78L35 11a2.81 2.81 0 0 0-.5-4zm-22 24.49l-6.3 3.15 1.54-6.84 11-14.06 4.72 3.71zm14.15-18l-4.76-3.68L25 5.88l4.71 3.71z', );

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
    // }, 'M42.84 16H37c4-16-7-16-7-16h-2.77a4.61 4.61 0 0 0-4.58 5.19l.14 1.15a4.7 4.7 0 0 1-.67 3.08l-3.34 4.81a2.5 2.5 0 0 0 .82 3.44 2.49 2.49 0 0 0 3.4-.82l4.22-6.23A5.06 5.06 0 0 0 28 8a4.3 4.3 0 0 0 0-.62l-.14-1.11A1.13 1.13 0 0 1 28.94 5H30a3.17 3.17 0 0 1 2 1.06c.54.69 1.62 2.91.17 8.73L30.6 21h11.83a2.28 2.28 0 0 1 2.2 2.9l-4 14.42A2.3 2.3 0 0 1 38.45 40H16.66A2.62 2.62 0 0 0 14 42.65 2.5 2.5 0 0 0 16.5 45h22.19a7 7 0 0 0 6.72-5.12l4.16-15.05A7 7 0 0 0 42.84 16z', 'M14.81 19H3.19A3.19 3.19 0 0 0 0 22.19v22.62A3.19 3.19 0 0 0 3.19 48h11.62A3.19 3.19 0 0 0 18 44.81V22.19A3.19 3.19 0 0 0 14.81 19zM13 41.88A1.12 1.12 0 0 1 11.88 43H6.12A1.12 1.12 0 0 1 5 41.88V25.12A1.12 1.12 0 0 1 6.12 24h5.76A1.12 1.12 0 0 1 13 25.12z');

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
