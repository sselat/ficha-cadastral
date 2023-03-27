var db = openDatabase('provider_db', '1.0', 'Fichas cadastradas pelos usuários', 2 * 1024 * 1024)

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS fichas_cadastradas (id INTEGER PRIMARY KEY, username TEXT, rg TEXT, cpf TEXT, address TEXT, gender TEXT, birthDate DATE, relationship TEXT)')
})

function addData (data) {
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO fichas_cadastradas (username, rg, cpf, address, gender, birthDate, relationship) VALUES (?, ?, ?, ?, ?, ?, ?)', [data.username, data.rg, data.cpf, data.address, data.gender, data.birthDate, data.relationship], function(tx, result) {
           // sucesso
           alert('Dados inseridos com sucesso!')
           showData()
        }, function(tx, error) {
           // erro
           alert('Erro ao inserir dados: ' + error.message)
        })
     })
} 

function showData () {
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
            },
            function (transaction, error) {
                console.log(error)
            })
    })
}

function criarDiv(row) {
    const divHTML = 
    `
        <h2>Cadastro ${row.id}</h2>
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
                <td>
                    <p>${row.rg}</p>
                <td>
                    <label class="label">C.P.F.:</label>
                </td>
                <td>
                    <p>${row.cpf}</p>
                </td>
            </tr>
            <tr class="alignedLeft">
                <td>
                    <label>Endereço:</label>
                </td>
                <td colspan="3" id="endereco">
                    <p>${row.address}</p>
                </td>
            </tr>
            <tr>
                <td>
                    <label>Sexo:</label>
                </td>
                <td>
                    <p>${row.gender}</p>
                </td>
                <td class="label nascimento">
                    <label>Data Nascimento:</label>
                </td>
                <td>
                    <p>${row.birthDate}</p>
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