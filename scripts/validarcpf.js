let cpf = '011.207.221-60'
validarCpf(cpf)

function validarCpf(rawCpf) {
  let cpf = rawCpf.slice(0,-2).replace(/[^a-zA-Z0-9]/g,'')
  let cpfArray = [...cpf]
  let comparationArray = [10, 9, 8, 7, 6, 5, 4, 3, 2]

  console.log('cpf formatado: ' + cpf)
  console.log('Array: ' + cpfArray)
  console.log('Reverse: ' + comparationArray)

  const arrayMultiplicado = cpfArray.map((val, index) => {
    return Number(val) * Number(comparationArray[index])
  })

  console.log('Array soma: ' + arrayMultiplicado)

  let somaTotal = arrayMultiplicado.reduce((val, soma) => {
    return val + soma
  }, 0)

  console.log('Soma total: ' + somaTotal)

  console.log('Resto: ' + parseInt((somaTotal*10)/11))
}