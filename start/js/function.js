'use strict'
import {
  noteId,
  notes
} from './index.js'


export function clearTextArea() {
  document.querySelector('.headingInput').value = '';
  document.querySelector('.newNoteArea').value = '';
}

export function fullNoteId(id) {
  return `note-${id}`
}

export function createId() {
  const id = noteId
  const strNoteId = `note-${id}`

  noteId++

  return {
    id,
    strNoteId
  }
}

export function createDiv() {
  return document.createElement('div')
}

export function scrollTop() {
  notes.scrollTop = notes.scrollHeight
}  

export function readyBtnHandler(noteId) {
  changeStyle()

}

function changeStyle() {
  const textBackColor = notesText.style.backgroundColor
  const headBackColor = headingText.style.backgroundColor
  const textBackDecor = notesText.style.textDecoration
  const headBackDecor = headingText.style.textDecoration

  const gray = 'rgb(105 105 105)'
  const blue = 'rgb(114, 126, 153)'
  const lightGray = 'rgb(131, 130, 133)'

  if (textBackColor !== gray) {
    textBackColor = gray
    headBackColor = gray
    textBackDecor = 'line-through'
    headBackDecor = 'line-through'
  }

  if (textBackColor == gray) {
    textBackColor = blue
    headBackColor = lightGray
    textBackDecor = 'none'
    headBackDecor = 'none'
  }
}


// createBtn(id, 'ready', btnBlock, (mainElem) => {
//   if (notesText.style.backgroundColor !== 'rgb(131, 130, 133)') { 
//   //   notesText.style.backgroundColor = 'rgb(131, 130, 133)';
//   //   notesText.style.textDecoration = 'line-through';
//   //   headingText.style.textDecoration = 'line-through';
//   //   noteBlock.style.backgroundColor = 'rgb(131, 130, 133)';

//     readyKey = mainElem.getAttribute('id');
//     const key = readyKey.slice(5);

//     getInfFromLS(key);
//     inf.ready = true;
//     addToJSON(inf);
//     saveInLocalStorage(key, infJSON);
      
//     return
//   }
//   else {
//     // notesText.style.backgroundColor = 'rgb(114, 126, 153)';
//     // notesText.style.textDecoration = 'none';
//     // headingText.style.backgroundColor = 'rgb(131, 130, 133)';
//     // headingText.style.textDecoration = 'none';
//     // noteBlock.style.backgroundColor = 'rgb(114, 126, 153)';

//     readyKey = mainElem.getAttribute('id');
//     const key = readyKey.slice(5);

//     getInfFromLS(key);
//     inf.ready = false;
//     addToJSON(inf);
//     saveInLocalStorage(key, infJSON);
//   }; 

//   clearTextArea();

//   headingNote.focus();
//   notes.scrollTop = notes.scrollHeight;
//   const noteInJSON = addToJSON({
//     heading,
//     text,
//     ready
//   });

//   saveInLocalStorage(--noteId, noteInJSON);
//   createId()
//   console.log(noteInJSON)
// });

// -----------------
// -----------------
