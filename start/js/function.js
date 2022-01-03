'use strict'


export function getNotesFromLS() {
  
  let oldNotes = []
  for (let i = 0; i < localStorage.length; i++) {
    let obj = JSON.parse(localStorage.getItem(i))
    oldNotes.push(obj)
  }

  return oldNotes
}

// function createOldNotes() { 
  
//   oldNotes.forEach(function(createNote) {
//     // ... делать что-то с item
//   });

//   for(let i = 0; i < oldNotes.length; i++) {
    
//   }


// }
