export function unlockedBtn(btn, blacklight) {
  console.log('[unlockedBtn]')
  console.log('[unlockedBtn  btn]', btn)
  
  const deletedDiv = btn.getElementsByClassName('btnBlocked')
  deletedDiv[0].remove()

  const blockedBtn = document.querySelectorAll('.btn')

  for (const item of blockedBtn) {
    item.style.pointerEvents = 'auto'
  }
  btn.classList.add(blacklight)
  
  // btn.onclick = null

  const btnAdd = document.getElementById('addArea')
  btnAdd.style.pointerEvents = 'auto'
}
