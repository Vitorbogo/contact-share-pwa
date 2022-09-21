// ATENÇÃO, Insira seu script aqui

//Nome do aluno: VITOR DA SILVEIRA BOGO
//----------------------------------------------------------------------------------------------------------------

const campoEmail = document.querySelector('#email')
const campoNome = document.querySelector('#nome')
const formulario = document.forms[0]
const campoDataInicial = document.querySelector('#data-inicial')
const campoDataFinal = document.querySelector('#data-final')
const habilidades = document.getElementsByName('habilidade')

let entries = []

document.getElementsByName('regiao').forEach((regiao) => {
  regiao.addEventListener('change', (evento) => {
    validarRegiao(evento.target)
  })
})

formulario.addEventListener('submit', (evento) => {
  let temErro = false
  if (!validarNome(campoNome.value)) {
    escreveErro(campoNome, 'Nome tem que ter mais de 3 caracteres')
    temErro = true
  }
  if (!validarEmail(campoEmail.value)) {
    escreveErro(campoEmail, 'Email inválido')
    temErro = true
  }

  const campoSobrenome = document.querySelector('#sobrenome')
  if (!validarSobrenome(campoSobrenome.value)) {
    escreveErro(campoSobrenome, 'Sobrenome inválido')
    temErro = true
  }

  const campoSite = document.querySelector('#website')
  if (!validarWebsite(campoSite.value)) {
    escreveErro(
      campoSite,
      'Informe um endereço no formato http[x]://www.exemplo.com'
    )
    temErro = true
  }

  if (!validarHabilidades(habilidades)) {
    document.querySelector('.erro-regiao').textContent =
      'Informe no mínimo 1 e no máximo 3 habilidades'
    temErro = true
  }

  // criar objeto para salvar
  if (!temErro) {
    evento.preventDefault()
  } else {
    //prevent default para eu poder ver o console.log
    // depois retirar isso
    evento.preventDefault()

    let serviceEntry = {
      nome: campoNome.value,
      sobrenome: campoSobrenome.value,
      email: campoEmail.value,
      website: campoSite.value,
      startDate: campoDataInicial.value,
      finalDate: campoDataFinal.value,
      region: 'regiao',
      skills: 'skills',
    }
    newEntry(serviceEntry)
  }
})

campoNome.addEventListener('blur', (evento) => {
  if (!validarNome(evento.target.value)) {
    escreveErro(evento.target, 'Nome tem que ter mais de 3 caracteres')
  }
})

campoEmail.addEventListener('blur', (evento) => {
  if (!validarEmail(evento.target.value)) {
    escreveErro(evento.target, 'Email inválido')
  }
})

function escreveErro(elemento, mensagem) {
  elemento.classList.add('is-invalid')
  let elMsg = elemento.parentNode.querySelector('.invalid-feedback')
  elMsg.textContent = mensagem
}

function validarNome(nome) {
  return nome.trim().length >= 3
}

function validarSobrenome(sobrenome) {
  return sobrenome.trim().length > 0
}

function validarEmail(email) {
  let partes = email.split('@')

  if (partes.length != 2) {
    return false
  }

  let segundaParte = partes[1]

  return segundaParte.indexOf('.') >= 0
}

function validarData(dataInicial, dataFinal) {
  let vetorDataInicial = dataInicial.split('/')
  let objDataInicial = new Date(
    vetorDataInicial[2],
    vetorDataInicial[1] - 1,
    vetorDataInicial[0]
  )

  let vetorDataFinal = dataFinal.split('/')
  let objDataFinal = new Date(
    vetorDataFinal[2],
    vetorDataFinal[1] - 1,
    vetorDataFinal[0]
  )

  let objDataAtual = new Date()

  if (objDataFinal < objDataInicial) {
    return false
  }

  if (objDataInicial < objDataAtual) {
    return false
  }

  return true
}

function validarWebsite(site) {
  if (site.trim().length == 0) {
    return true
  }

  if (!(site.startsWith('http://') && site.startsWith('https://'))) {
    return false
  }

  return site.indexOf('.') > 0
}

function validarHabilidades(habilidades) {
  let total = 0
  habilidades.forEach((habilidade) => {
    if (habilidade.checked) {
      total++
    }
  })
  return total > 0 && total < 4
}

function validarRegiao(regiao) {
  let elProgramador = document.querySelector('#habilidade-programador')
  let elDBA = document.querySelector('#habilidade-dba')
  if (regiao.id == 'regiao-coeste') {
    elProgramador.disabled = true
    elProgramador.checked = false
    elDBA.disabled = true
    elDBA.checked = false
  } else {
    elProgramador.disabled = false
    elDBA.disabled = false
  }
}

/*
    - fazer criação de html dinamicamente
    - Permitir edição / remoção
    - Usar dados locais
*/

function newEntry(serviceEntry) {
  console.log('entry', serviceEntry)
  let id = entries.push(serviceEntry)
  let entriesText = JSON.stringify(entries)
  window.localStorage.setItem('Service Entries', entriesText)
  addTableEntry(serviceEntry, id)
}

function loadEntries() {
  entries = JSON.parse(window.localStorage.getItem('Service Entries'))
  let table = document.querySelector('#tabela-prestador-servico')
  for (let x = 0; x < entries.length; x++) {
    let serviceEntry = entries[x]
    if (serviceEntry != null) {
      addTableEntry(serviceEntry, x)
    }
  }
}

function addTableEntry(serviceEntry, id) {
  // construir html dinamico
  // atribuir valores aos campos html
  // atribuir botoes de edição

  let table = document.querySelector('#tabela-prestador-servico')
  let row = table.tBodies[0].insertRow()
  let cellNome = row.insertCell()
  let cellSobrenome = row.insertCell()
  let cellEmail = row.insertCell()
  let cellWebsite = row.insertCell()
  let cellDataInicial = row.insertCell()
  let cellDataFinal = row.insertCell()
  let cellRegiao = row.insertCell()
  let cellHabilidades = row.insertCell()
  let cellEdit = row.insertCell()
  let cellDelete = row.insertCell()

  cellNome.textContent = serviceEntry.nome
  cellSobrenome.textContent = serviceEntry.sobrenome
  cellEmail.textContent = serviceEntry.email
  cellWebsite.textContent = serviceEntry.website
  cellDataInicial.textContent = serviceEntry.startDate
  cellDataFinal.textContent = serviceEntry.finalDate
  cellRegiao.textContent = serviceEntry.region
  cellHabilidades.textContent = serviceEntry.skills

  let editButton = document.createElement('button')
  editButton.className = 'btn-edit'
  editButton.innerText = 'Editar'
  editButton.dataset.entryId = id
  cellEdit.appendChild(editButton)
  editButton.addEventListener('click', (value) => {
    editEntry(value.target)
  })

  let deleteButton = document.createElement('button')
  deleteButton.className = 'btn-delete'
  deleteButton.innerText = 'Deletar'
  deleteButton.dataset.entryId = id
  cellDelete.appendChild(deleteButton)
  deleteButton.addEventListener('click', (value) => {
    deleteEntry(value.target)
  })
}

function editEntry(editButton) {}

function removeEntry(deleteButton) {
  let id = deleteButton.dataset.entryId
  delete entries[id]
  window.localStorage.setItem('Service Entries', JSON.stringify(entries))
  let table = document.querySelector('#tabela-prestador-servico')
  let rowToDelete = deleteButton.parentNode.parentNode
  table.tBodies[0].removeChild(rowToDelete)
}
