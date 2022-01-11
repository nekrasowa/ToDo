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

export function doReadyStyle(field1, field2, block) {
  const gray = 'rgb(131, 130, 133)'

  field1.style.backgroundColor = gray
  field1.style.textDecoration = 'line-through'
  field2.style.textDecoration = 'line-through'
  block.style.backgroundColor = gray
}

export function doNotReadyStyle(field1, field2, block) {
  const gray = 'rgb(131, 130, 133)'
  const blue = 'rgb(114, 126, 153)'

  field1.style.backgroundColor = blue
  field1.style.textDecoration = 'none'
  field2.style.backgroundColor = gray
  field2.style.textDecoration = 'none'
  block.style.backgroundColor = blue
}
