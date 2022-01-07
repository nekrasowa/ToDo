function alphabetPosition(text) {
  const numbersStr = ''
  
  for (let i = 0; i < text.lenght; i++) {
  
    const newText = text.toLowerCase()
     
    console.log(newText)
    
    const numb = newText.charCodeAt(i)
    
    console.log(numb)


    if (numb < 97, numb > 122) {continue}
    
    const rightNumb = (numb - 96)

    const strRightNumb = String(rightNumb)
    console.log(rightNumb)

    numbersStr.push(strRightNumb)
                    
  }
  return numbersStr;
}

const create = alphabetPosition("The sunset sets at twelve o' clock.")

console.log(create)