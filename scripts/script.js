const enderecoInput = document.getElementById('enderecoInput')
const searchBtn = document.getElementById('searchBtn')

document.getElementById('cpfInput')
    .addEventListener('input', function () {
        let cpf = this.value.replace(/\D/g, '')
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        this.value = cpf
    })

document.getElementById('cpfInput')
    .addEventListener('keydown', function (e) {
        const key = e.key

        if (!/\d/.test(key)) {
            if (key === "Backspace" || key === "Delete" || key === "Tab" || key === "Enter" || key.includes("Arrow")) {
                return true;
            } else {
                alert("Por favor, insira apenas números.");
                return false;
            }
        }
    })

function showAddressBar(endereco) {
    if (enderecoInput.value) {
        enderecoInput.style.visibility = 'visible'
        searchBtn.style = 'width:10%; left: calc(90% - 1px); border-left: transparent;'
    }
}

function validarCep() {
    let cep = document.getElementById('cepInput').value
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
                enderecoInput.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`
                showAddressBar()
            }
        })
        .catch(error => {
            console.error('Ocorreu um erro na requisição: ', error)
            alert('Não foi possível obter os dados do CEP informado. Verifique novamente')
            searchBtn.style = "background-color: tomato;color: #fff;"
        })
    showAddressBar()
}

function validarFormulario() {
    if (!enderecoInput.value.length > 0) {
        searchBtn.style = "background-color: tomato;color: #fff;"
        alert('Endereço inválido!')
        return false
    } else if (document.getElementById('cpfInput').value.length < 13) {
        alert('CPF Inválido O CPF deve ter pelo menos 13 caracteres!')
        document.getElementById('cpfInput').style.borderColor = 'tomato'
        return false
    } else {
        return true
    }
}

function validarNome() {
    const nameInput = document.getElementById('nameInput')
    const name = nameInput.value.trim()
    const firstName = name.split(' ')[0]
    // verifica se o usuário digitou pelo menos dois nomes
    if(name.split(' ').length < 2) {
        alert ('Digite o seu nome completo!')
        return false
    }
    // verifica se o usuário digitou algum caractere especial ou número 
    if (!/^[a-zA-Z\s-]+$/.test(name)) {
        alert('Somente letras e hífens (-) serão permitidos.')
        return false
    }
    // verifica se o primeiro nome do usuário tem menos de 5 caracteres, e se ele digitou corretamente
    if (firstName.length < 5){
        const confirmarNome = confirm(`O nome ${firstName} tem menos de 5 letras. Você digitou corretamente?`)
        if(!confirmarNome){
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
        formValues.address = document.getElementById("enderecoInput").value
        formValues.username = document.getElementById("nameInput").value
        formValues.rg = document.getElementById("rgInput").value
        formValues.cpf = document.getElementById("cpfInput").value
        formValues.gender = document.getElementById("generoInput").value
        formValues.birthDate = document.getElementById("nascimentoInput").value
        formValues.relationship = document.querySelector('input[name="relacionamentoInput"]:checked').value
        addData(formValues) //funcao executada pelo database.js
        document.getElementsByTagName('form')[0].reset()
    }
}
)

function showArrow() {
    let scrollIndicator = document.getElementById('scroll-indicator')
    let pageHeight = document.body.scrollHeight
    let windowHeight = window.innerHeight

    if (pageHeight > windowHeight) {
        scrollIndicator.style.display = 'block'
    }
}

function setDateLimit() {
    const hoje = new Date()
    const ontem = new Date(hoje.getTime() - (24 * 60 * 60 * 1000))
    const dataLimite = ontem.toISOString().split('T')[0]

    document.getElementById('nascimentoInput').max = dataLimite
}