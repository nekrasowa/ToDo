'use strict'
// function createBtn(div, mainElem, name, blacklight, cb) {
  //  { 
  //    const elem = document.createElement('div');
  //   elem.classList.add(name);
  //   elem.classList.add(blacklight);

  //   const srcSVG = `img/${name}.svg`;
  //   const iconElem = new Image;
  //   iconElem.src = srcSVG;
  //   iconElem.classList.add('icon', `${name}-img`);
  //   iconElem.setAttribute('alt', `${name}Icon`);
  // }

  //   mainElem.appendChild(elem);
  //   elem.appendChild(iconElem);

  //   elem.onclick = () => {
  //     cb(div);
  //   };
  // }

function createBtns(name, blacklight, cb, mainElem = note) {
  const elem = document.createElement('div')
  AddClasses(name, blacklight)
  AddIcons(name)

  mainElem.appendChild(elem)
  elem.appendChild(iconElem)

  elem.onclick = () => {
    cb();
  };
}

function AddIcons(name) {
  const srcSVG = `img/${name}.svg`
  const iconElem = new Image
  iconElem.src = srcSVG
  iconElem.classList.add('icon', `${name}-img`)
  iconElem.setAttribute('alt', `${name}Icon`)
}

function AddClasses(name, blacklight) {
  elem.classList.add(name)
  elem.classList.add(blacklight)
}



function clearTextArea() {
// (selectors = ['.headingInput', '.newNoteArea']) {
  document.querySelector('.headingInput').value = '';
  document.querySelector('.newNoteArea').value = '';
  // for (const selector of selectors) {
  //   document.querySelector(selector).value = ''
  // }
}




