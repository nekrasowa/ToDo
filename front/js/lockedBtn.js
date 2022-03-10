'use strict'

export function lockedBtn(btn, blacklight, btnBlocked) {
  // btn.classList.remove('cursor')
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

// function createBtn(div, mainElem, name, blacklight, cb) {
//   const btn = document.createElement('div')
//   btn.classList.add('btn', name)
//   btn.classList.add(blacklight)
//   btn.classList.add('cursor')
//   btn.style.display = 'grid'

//   const btnBlocked = document.createElement('div')
//   btnBlocked.classList.add('btn', name, 'block')
//   btnBlocked.style.display = 'none'

//   const cssloadСontainer = document.createElement('div')
//   cssloadСontainer.classList.add('cssload-container')
//   const cssloadCrazyArrow = document.createElement('div')
//   cssloadCrazyArrow.classList.add('cssload-crazy-arrow')

//   const srcSVG = `img/${name}.svg`
//   const iconElem = new Image
//   iconElem.src = srcSVG
//   iconElem.classList.add('icon', `${name}-img`)
//   iconElem.setAttribute('alt', `${name}Icon`)

//   mainElem.appendChild(btn)
//   btn.appendChild(btnBlocked)
//   btn.appendChild(iconElem)
//   btnBlocked.appendChild(cssloadСontainer)
//   cssloadСontainer.appendChild(cssloadCrazyArrow)

//   btn.onclick = () => {
//     // lockedBtn(btn, blacklight, btnBlocked)
//     cb(div, btn, btnBlocked)
//   }
// }