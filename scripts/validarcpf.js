const cpf = '01120722160'
let cpfArray = [...cpf]
let cpfReverse = [...cpf].reverse()


console.log('Array: ' + cpfArray)
console.log('Reverse: ' + cpfReverse)

const cpfSoma = cpfArray.map((val,index) => {
  return Number(val) + Number(cpfReverse[index])
})

let somaTotal = cpfSoma.reduce((val, soma) => {
  return val+soma
},0)

console.log(valor)