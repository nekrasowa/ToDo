'use strict'

export function locedBtn(btn, blacklight, btnBlocked) {
  btn.classList.remove('cursor')
  btn.classList.remove(blacklight)
  btn.onclick = null

  btnBlocked.style.position = 'absolute' 
  btnBlocked.style.display = 'inline' 

  const blockedBtn = document.querySelectorAll('.btn')

  for (const item of blockedBtn) {
    item.style.pointerEvents = 'none'
  }
}
