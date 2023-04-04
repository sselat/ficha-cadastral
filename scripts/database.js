var db = openDatabase('provider_db', '1.0', 'Fichas cadastradas pelos usuários', 2 * 1024 * 1024)

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS fichas_cadastradas (id INTEGER PRIMARY KEY, username TEXT, rg TEXT, cpf TEXT, address TEXT, gender TEXT, birthDate DATE, relationship TEXT)')
})

function addData(data) {
    db.transaction(function (tx) {
        const jsonAddress = JSON.stringify(data.address)
        tx.executeSql('INSERT INTO fichas_cadastradas (username, rg, cpf, address, gender, birthDate, relationship) VALUES (?, ?, ?, ?, ?, ?, ?)', [data.username, data.rg, data.cpf, jsonAddress, data.gender, data.birthDate, data.relationship], function (tx, result) {
            // sucesso
            alert('Dados inseridos com sucesso!')
            showData()
        }, function (tx, error) {
            // erro
            alert('Erro ao inserir dados: ' + error.message)
        })
    })
}

function showData() {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM fichas_cadastradas', [],
            function (tx, results) {
                const dynamicDiv = document.getElementById('dynamicDivs')
                dynamicDiv.innerHTML = ''
                let len = results.rows.length;
                for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i)
                    let div = document.createElement('div')
                    div.classList.add('container', 'info')
                    div.innerHTML = criarDiv(row)
                    dynamicDiv.appendChild(div)
                }
                showArrow()
                cpfInput.style.border = ''
            },
            function (transaction, error) {
                console.log(error)
            })
    })
}

function deleteItem(id) {
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM fichas_cadastradas WHERE id = ?', [id], function(tx, results) {
            alert('Item removido com sucesso!')
            showData()
            showArrow()
        }, function(tx, error) {
            console.log('Erro ao remover item: ' + error.message)
        })
    })
    
}

function deleteAllItems() {
    if (confirm("Tem certeza de que deseja excluir todos os itens?")) {
        db.transaction(function(tx) {
            tx.executeSql('DELETE FROM fichas_cadastradas', [], function(tx, results) {
                alert('Todos os itens foram removidos com sucesso!')
                location.reload()
            }, function(tx, error) {
                console.log('Erro ao remover itens: ' + error.message)
            })
        })
    }
}

function criarDiv(row) {
    const endereco = JSON.parse(row.address)
    const birthDate = formatDate(row.birthDate)
    const divHTML =
        `
        <h2>Cadastro ${row.id}</h2>
        <button id="deleteButton" onclick="deleteItem(${row.id})">
            <span class="material-symbols-outlined">
            delete
            </span>
        </button>
        <table>
            <tr class="alignedLeft">
                <td>
                    <label>Nome:</label>
                </td>
                <td colspan="3">
                    <p>${row.username}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <label>RG:</label>
                </td>
                <td style="text-align: left; width: 40%">
                    <p>${row.rg}</p>
                <td>
                    <label class="label" style="width: 15%">C.P.F.:</label>
                </td>
                <td style="width: 40%; text-align: right">
                    <p>${row.cpf}</p>
                </td>
            </tr>
            <tr class="alignedLeft">
                <td>
                    <label>Endereço:</label>
                </td>
                <td id="endereco">
                    <p>${endereco.logradouro}</p>
                </td>
                <td class="smallTd">
                    <label>Nº:</label>
                </td>
                <td id="houseNumber">
                    <p>${endereco.numero}</p>
                </td>
            </tr>
            <tr class="alignedLeft">
                <td>
                    <label>Complemento: </label>
                </td>
                <td id="endereco">
                    <p>${endereco.complemento}</p>
                </td>
            </tr>
            <tr class="alignedLeft">
                <td>
                    <label>Bairro: </label>
                </td>
                <td style="width: 55%;">
                    <p>${endereco.bairro}</p>
                </td>
                <td style="width: 10%">
                    <label style="width: 100%">Cep: </label>
                </td>
                <td style="text-align: right">
                    <p style="text-align: right">${endereco.cep}</p>
                </td>
            </tr>
            <tr class="alignedLeft">
                <td>
                    <label>Cidade:</label>
                </td>
                <td id="endereco">
                    <p>${endereco.cidade}</p>
                </td>
                <td class="smallTd">
                    <label>UF:</label>
                </td>
                <td id="houseNumber">
                    <p>${endereco.uf}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Sexo:</label>
                </td>
                <td style="text-align: left; width: 40%">
                    <p>${row.gender}</p>
                <td>
                    <label class="label" style="width: 15%">Nascimento:</label>
                </td>
                <td style="width: 40%; text-align: right">
                    <p>${birthDate}</p>
                </td>
            </tr>
            <tr class="alignedLeft">
                <td>
                    <label>Situação Civil:</label>
                </td>
                <td class="td-relacionamento">
                    <p>${row.relationship}</p>
                </td>
            </tr>
        </table>
    `
    return divHTML
}

function formatDate(date) {
    const data = new Date(date)
    const dia = data.getDate()
    const mes = data.getMonth() + 1
    const ano = data.getFullYear()
    const dataFormatada = `${dia.toString().padStart(2, "0")}/${mes.toString().padStart(2, "0")}/${ano}`
    return dataFormatada
}