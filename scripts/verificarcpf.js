function verificarCpf(rawCpf) {
  let cpf = rawCpf.slice(0, -2).replace(/[^a-zA-Z0-9]/g, '')
  let digitos = rawCpf.slice(rawCpf.length - 2, rawCpf.length)
  let cpfArray = [...cpf]
  let comparationArray = [10, 9, 8, 7, 6, 5, 4, 3, 2]

  const arrayMultiplicado = cpfArray.map((val, index) => {
    return Number(val) * Number(comparationArray[index])
  })

  let somaTotal = arrayMultiplicado.reduce((val, soma) => {
    return val + soma
  }, 0)

  let resto = (somaTotal * 10) % 11

  if (resto === 10 || resto === 11 ) {
    if (digitos.charAt(0) == 0) {
      return verificarCpf2(rawCpf)
    } else {
      return invalidarCpf()
    }
  } else {
    if (resto == digitos.charAt(0)) {
      return verificarCpf2(rawCpf)
    } else {
      return invalidarCpf()
    }
  }
}


function verificarCpf2(rawCpf) {
  let cpf = rawCpf.slice(0, -1).replace(/[^a-zA-Z0-9]/g, '')
  let digitos = rawCpf.slice(rawCpf.length - 1, rawCpf.length)
  let cpfArray = [...cpf]
  let comparationArray = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2]

  const arrayMultiplicado = cpfArray.map((val, index) => {
    return Number(val) * Number(comparationArray[index])
  })

  let somaTotal = arrayMultiplicado.reduce((val, soma) => {
    return val + soma
  }, 0)

  let resto = (somaTotal * 10) % 11


  if (resto === 10 || resto === 11 ) {
    if (digitos.charAt(0) == 0) {
      validarCpf()
    }
    else {
      return invalidarCpf()
    }
  }
  else {
    if (resto == digitos.charAt(0)) {
      return validarCpf()
    }
    else {
      return invalidarCpf()
    }
  }
}

function validarCpf() {
  cpfInput.style.borderColor = 'limegreen'
}
function invalidarCpf() {
  cpfInput.style.borderColor = 'tomato'
  alert('Cpf inválido!')
}