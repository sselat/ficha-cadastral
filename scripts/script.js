const enderecoInput = document.getElementById('enderecoInput')
const nameInput = document.getElementById("nameInput")
const houseNumberInput = document.getElementById('houseNumber')
const stateInput = document.getElementById('stateInput')
const complementoInput = document.getElementById('complementoInput')
const bairroInput = document.getElementById('bairroInput')
const cityInfo = document.getElementById('cityInfo')
const searchBtn = document.getElementById('searchBtn')
const cepInput = document.getElementById("cepInput")
const cpfInput = document.getElementById('cpfInput')
const rgInput = document.getElementById('rgInput')

// função para formatar o campo de CEP
cepInput.addEventListener("input", function () {

    // remove tudo que não for número
    if (this.value.length === 6) {
        this.value = this.value.replace(/[^\d-]/g, "")
    } else {
        this.value = this.value.replace(/\D/g, "")
    }
    // adiciona o hífen após o quinto dígito
    if (this.value.length > 5) {
        this.value = this.value.replace(/^(\d{5})(\d{1,3})/, "$1-$2")
    }
})

// função para permitir apenas números no input do número da casa
houseNumberInput.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, "")
})

cpfInput
    .addEventListener('input', function () {
        formatCpfInput(cpfInput)
        let cpf = this.value.replace(/\D/g, '')
        if (cpf.length === 11) {
            for (let i = 0; i < cpf.length; i++) {
                if (cpf[0] !== cpf[i]) {
                   return verificarCpf(cpf)
                }
            }
            return invalidarCpf()
        }
    })

cpfInput
    .addEventListener('keydown', function (e) {
        const key = e.key
        if (!/\d/.test(key)) {
            if (key === "Backspace" || key === "Delete" || key === "Tab" || key === "Enter" || key.includes("Arrow")) {
                return true;
            } else {
                return false;
            }
        }
    })
rgInput
    .addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, "")
    })
rgInput
    .addEventListener('keydown', function (e) {
        const key = e.key
        if (!/\d/.test(key)) {
            if (key === "Backspace" || key === "Delete" || key === "Tab" || key === "Enter" || key.includes("Arrow")) {
                return true;
            } else {
                return false;
            }
        }

    })

function formatCpfInput () {
    const cpf = cpfInput.value.replace(/\D/g, '')
    if (cpf.length === 11) {
        cpfInput.value = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    } else {
        cpfInput.value = cpf
        cpfInput.style.border = ''
    }
}
function validarCep() {
    let cep = cepInput.value
    console.log(cep)
    if (cep !== null) {
        cep = cep.trim()
        if (/^[0-9]{5}-?[0-9]{3}$/.test(cep)) {
            buscaCep(cep.replace("-", ""))
        } else if (/[^0-9\-]/.test(cep)) {
            alert("O CEP digitado contém caracteres inválidos.")
            searchBtn.style = "background-color: tomato;color: #fff;"
        } else {
            alert("O CEP digitado não é válido.")
            searchBtn.style = "background-color: tomato;color: #fff;"
        }
    }
}
function buscaCep(cep) {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('Não foi possível obter os dados do CEP informado. Verifique novamente')
                searchBtn.style = "background-color: tomato;color: #fff;"
            } else {
                preencherEndereco(data)
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro na requisição: ', error)
            alert('Não foi possível obter os dados do CEP informado. Verifique novamente')
            searchBtn.style = "background-color: tomato;color: #fff;"
        })
}

function preencherEndereco(data) {
    enderecoInput.value = data.logradouro
    stateInput.value = data.uf
    bairroInput.value = data.bairro
    cityInfo.value = data.localidade

    enderecoInput.removeAttribute('disabled')
    stateInput.removeAttribute('disabled')
    complementoInput.removeAttribute('disabled')
    bairroInput.removeAttribute('disabled')
    cityInfo.removeAttribute('disabled')
    houseNumberInput.removeAttribute('disabled')
}
function validarFormulario() {
    if (!enderecoInput.value.length > 0) {
        searchBtn.style = "background-color: tomato;color: #fff;"
        alert('Endereço inválido!')
        return false
    } else if (cpfInput.value.length < 13) {
        alert('CPF Inválido O CPF deve ter pelo menos 13 caracteres!')
        cpfInput.style.borderColor = 'tomato'
        return false
    } else {
        return true
    }
}

function validarNome() {
    const name = nameInput.value.trim()
    const firstName = name.split(' ')[0]
    // verifica se o usuário digitou pelo menos dois nomes
    if (name.split(' ').length < 2) {
        alert('Digite o seu nome completo!')
        return false
    }
    // verifica se o usuário digitou algum caractere especial ou número 
    if (!/^[a-zA-Z\s-]+$/.test(name)) {
        alert('Somente letras e hífens (-) serão permitidos.')
        return false
    }
    // verifica se o primeiro nome do usuário tem menos de 5 caracteres, e se ele digitou corretamente
    if (firstName.length < 5) {
        const confirmarNome = confirm(`O nome ${firstName} tem menos de 5 letras. Você digitou corretamente?`)
        if (!confirmarNome) {
            nameInput.style.borderColor = 'tomato'
            return false
        }
    }

    return true
}

document.getElementById('ficha-cadastral').addEventListener('submit', function (event) {
    event.preventDefault()
    if (validarFormulario() && validarNome()) {
        var formValues = {}
        formValues.address =
        {
            "logradouro": enderecoInput.value,
            "numero": houseNumberInput.value,
            "complemento": complementoInput.value,
            "bairro": bairroInput.value,
            "cidade": cityInfo.value,
            "uf": stateInput.value,
            "cep": cepInput.value
        }
        formValues.username = nameInput.value
        formValues.rg = rgInput.value
        formValues.cpf = cpfInput.value
        formValues.gender = document.getElementById("generoInput").value
        formValues.birthDate = document.getElementById("nascimentoInput").value
        formValues.relationship = document.querySelector('input[name="relacionamentoInput"]:checked').value
        addData(formValues) //funcao executada pelo database.js
        document.getElementsByTagName('form')[0].reset()
    }
})

function showArrow() {
    let scrollIndicator = document.getElementById('scroll-indicator')
    let pageHeight = document.body.scrollHeight
    let windowHeight = window.innerHeight

    if (pageHeight > windowHeight) {
        scrollIndicator.style.display = 'block'
    }
    window.addEventListener('scroll', function() {
        if (window.scrollY === pageHeight - windowHeight) {
          scrollIndicator.style.display = 'none'
        } else {
          scrollIndicator.style.display = 'block'
        }
      })
}

function setDateLimit() {
    const hoje = new Date()
    const ontem = new Date(hoje.getTime() - (24 * 60 * 60 * 1000))
    const dataLimite = ontem.toISOString().split('T')[0]

    document.getElementById('nascimentoInput').max = dataLimite
}