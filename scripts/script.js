const enderecoInput = document.getElementById('enderecoInput')
const searchBtn = document.getElementById('searchBtn')

document.getElementById('cpfInput')
    .addEventListener('input', function() {
        let cpf = this.value.replace(/\D/g, '')
        cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        this.value = cpf
    })

document.getElementById('cpfInput')
    .addEventListener('keydown', function(e) {
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

function showAddressBar (endereco) {
    if (enderecoInput.value) {
        enderecoInput.style.visibility = 'visible'
        searchBtn.style= 'width:10%; left: calc(90% - 1px); border-left: transparent;'
    }
}

function typeCep() {
    let cep = prompt("Digite um CEP válido (ex: 1234567 ou 12345-678):")
    if (cep !== null) {
        cep = cep.trim()
        if (/^[0-9]{5}-?[0-9]{3}$/.test(cep)) { 
            buscaCep(cep.replace("-", ""))
        } else if (/[^0-9\-]/.test(cep)) {
            alert("O CEP digitado contém caracteres inválidos.")
        } else {
            alert("O CEP digitado não é válido.")
        }
    }
}

function buscaCep (cep) {
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`
 
    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if(data.erro) {
                alert('Não foi possível obter os dados do CEP informado. Verifique novamente')
            } else {
            enderecoInput.value = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}. CEP: ${data.cep}`
            showAddressBar() }
            })
        .catch(error => {
            console.error('Ocorreu um erro na requisição: ', error)
            alert('Não foi possível obter os dados do CEP informado. Verifique novamente')
        })
    showAddressBar()
}

function validarFormulario () {
    if (!document.getElementById("enderecoInput").value.length > 0) {
        document.getElementById("searchBtn").style = "background-color: tomato;color: #fff;"
        alert('Endereço inválido!')
        return false
    } else if (document.getElementById('cpfInput').value.length < 13) {
        alert('CPF Inválido O CPF deve ter pelo menos 13 caracteres!')
        document.getElementById('cpfInput').style.borderColor = 'tomato'
        return false
    } else if (document.getElementById('nameInput').value.length < 5) {
        return confirm(`O nome ${document.getElementById('nameInput').value} está correto?`)
    } else {
        return true
    }
}

document.getElementById('ficha-cadastral').addEventListener('submit', function(event) {
    event.preventDefault()
    if (validarFormulario()){
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
  