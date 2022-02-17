module.exports = function (array, noteId) {
  return array.findIndex(function(elem) {
    return elem?.id === noteId
  })
}



