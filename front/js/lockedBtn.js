'use strict'

export function lockedBtn(btn, blacklight, btnBlocked) {
  btn.classList.remove('cursor')
  btn.classList.remove(blacklight)
  btn.onclick = null

  btnBlocked.style.position = 'absolute' 
  btnBlocked.style.display = 'inline' 

  const blockedBtn = document.querySelectorAll('.btn')

  for (const item of blockedBtn) {
    item.style.pointerEvents = 'none'
  }

  const btnAdd = document.getElementById('addArea')
  btnAdd.style.pointerEvents = 'none'
}
