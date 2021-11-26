
  function getInfFromLS(id){
    const rawInf = localStorage.getItem(id);
    inf = JSON.parse(rawInf);
  
  }


  function addToJSON(obj) {
    return JSON.stringify(obj)
  }
  
  function saveInLocalStorage(id, noteInJSON) {
      localStorage.setItem(id, noteInJSON);
  }
  