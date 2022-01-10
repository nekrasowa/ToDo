'use strict'

// export function getNotesFromLS() {
//   const oldNotes = []
//   const sorted = Object.entries(localStorage)
//     .sort(([key1], [key2]) => (+key1) - (+key2))

//   for (const [key, value] of sorted) {

//     const parsedKey = Number.parseInt(key)

//     if (!Number.isInteger(parsedKey)) {
//       continue
//     }

//     const obj = JSON.parse(value)
//     oldNotes[parsedKey] = obj
//   }

//   return oldNotes
// }

export function getNotesFromLS() {
  const oldNotes = new Map()
  
  const sorted = Object.entries(localStorage)
    .sort(([key1], [key2]) => (+key1) - (+key2))

    for (const [key, value] of sorted) {

      const parsedKey = Number.parseInt(key)
      
      if (!Number.isInteger(parsedKey)) {
        continue
      }
  
      const obj = JSON.parse(value)
      console.log ('obj:', obj)

      oldNotes.set(parsedKey, obj)
    }
  
    return oldNotes
}
