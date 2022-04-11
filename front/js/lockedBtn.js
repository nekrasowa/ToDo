'use strict'

export function lockedBtn(btn, blacklight) {
  // btn.classList.remove('cursor')
  const btnBlocked = document.createElement('div')
  btnBlocked.classList.add('btnBlocked')
  btnBlocked.style.position = 'absolute' 
  btnBlocked.style.display = 'inline' 

  const cssloadСontainer = document.createElement('div')
  cssloadСontainer.classList.add('cssload-container')
  const cssloadCrazyArrow = document.createElement('div')
  cssloadCrazyArrow.classList.add('cssload-crazy-arrow')

  btn.appendChild(btnBlocked)
  btnBlocked.appendChild(cssloadСontainer)
  cssloadСontainer.appendChild(cssloadCrazyArrow)

  if (blacklight) {
    btn.classList.remove(blacklight)
  }
  // btn.onclick = null
  console.log('[lockedBtn btn]', btn)

  const blockedBtn = document.querySelectorAll('.btn')

  for (const item of blockedBtn) {
    item.style.pointerEvents = 'none'
  }

  const btnAdd = document.getElementById('addArea')
  btnAdd.style.pointerEvents = 'none'
}
