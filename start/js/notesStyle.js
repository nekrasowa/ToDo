'use strict'

export function applyReadyStyle(field1, field2, block) {
  const gray = 'rgb(131, 130, 133)'

  field1.style.backgroundColor = gray
  field1.style.textDecoration = 'line-through'
  field2.style.textDecoration = 'line-through'
  block.style.backgroundColor = gray
}

export function applyAnreadyStyle(field1, field2, block) {
  const gray = 'rgb(131, 130, 133)'
  const blue = 'rgb(114, 126, 153)'

  field1.style.backgroundColor = blue
  field1.style.textDecoration = 'none'
  field2.style.backgroundColor = gray
  field2.style.textDecoration = 'none'
  block.style.backgroundColor = blue
}
