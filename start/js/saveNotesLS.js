'use strict'
import {
  infJSON
} from './index.js'


function addToJSON(obj) {
  return infJSON = JSON.stringify(obj)
}

export function saveInLocalStorage(id, noteInJSON) {
  localStorage.setItem(id, noteInJSON)
}

export const noteInJSON = addToJSON({
  heading,
  text,
  ready
})
