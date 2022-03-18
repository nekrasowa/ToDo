const hasheerama = 'Hasheerama'
const tobeerama = 'Tobeerama'
const hirusen = 'Hirusen'
const minato = 'Minato'
const tsunade = 'Tsunade'
const kakashee = 'Kakashee'
const naruto = 'Naruto'

// let hokage = 'hokage'

// function newKage(text, kage) {
//   hokage = kage
//   console.log(text + hokage)
// }

// function allKage() {
//   const firstKage = new Promise((resolve, reject) => {
//     console.log(`First was ${hasheerama}`)
//     setTimeout(() => {
//       resolve()
//     }, 1000)
//   })

//   firstKage.then(() => {
//     console.log(`Second was ${tobeerama}`)

//     return new Promise((resolve) => setTimeout(() => resolve(), 1000)) 
//   }).then(() => {
//     newKage('Third was: ', hirusen)
//     return new Promise((resolve) => setTimeout(() => resolve(), 1000)) 
//   }).then(() => {
//     newKage('Fourth was: ', minato)
//     return new Promise((resolve) => setTimeout(() => resolve(), 1000)) 
//   }).then(() => {
//     newKage('Seventh was: ', naruto)
//     // throw 'Anime was stoped'
//     return new Promise((resolve) => setTimeout(() => resolve(), 5000)) 
//     // return new Promise((resolve, reject) => setTimeout(() => reject(new Error('Anime was stoped'), 5000))
//     // )}).catch((e) => {
//     // console.log(e)
//   })
// }

// allKage()

// const prepareTechnique = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(`${naruto} prepares his Technique!`)
//     resolve('Technique ')
//   }, 3000)
// })

// const completeTechnique = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(`${naruto} completes his Technique!`)
//     resolve('kiled ')
//   }, 4000)
// })

// const finishTechnique = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log(`${naruto} finishes his Technique!`)
//     resolve('everybody!')
//   }, 1000)
// })

// const technique = [prepareTechnique, completeTechnique, finishTechnique]

// Promise.all(technique).then(values => {
//   console.log(values)
// })

function timeout(time, text, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(text)
      resolve(res)
    }, time)
} 
)}

function timeoutErr(time, res) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(res)
    }, time)
} 
)}


async function fight() {
  try {
    const prepareTechnique = timeout(3000, `${naruto} prepares his Technique!`, 'Technique ')

    const completeTechnique = timeout(4000, `${naruto} completes his Technique!`, 'kiled ')
  
    // const finishTechnique = timeoutErr(1000, new Error)
    
    // const techniques = [prepareTechnique, completeTechnique, finishTechnique]
  
    const empty = []
    // const resSet = await Promise.allSettled(techniques).then((results) => results.forEach((result) => console.log(result.status)));
  
    // const res = await Promise.all(techniques)
    const emp = await Promise.all(empty)

  
    // console.log('[allSettled]:', resSet)
  
    // console.log('[all]:', res)
    console.log('[all]:', emp)

  } catch(e) {
    console.error(e)
  }
}

fight()
