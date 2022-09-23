// ATENÇÃO, Insira seu script aqui

//Nome do aluno: VITOR DA SILVEIRA BOGO
//----------------------------------------------------------------------------------------------------------------

let entries = []

const campoEmail = document.querySelector('#email')
const campoNome = document.querySelector('#nome')
const campoSobrenome = document.querySelector('#sobrenome')
const campoWebsite = document.querySelector('#website')
const formulario = document.forms[0]
const campoDataInicial = document.querySelector('#data-inicial')
const campoDataFinal = document.querySelector('#data-final')
const habilidades = document.getElementsByName('habilidade')
const campoRegioes = document.getElementsByName('regiao')
const table = document.querySelector('#tabela-prestador-servico')
let btnToggle = false // false = padrão || true = update
let editValue = -1

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

  // get region value
  const regionValue = Array.from(campoRegioes).filter(
    (regiao) => regiao.checked
  )[0].id

  const skillsValue = Array.from(habilidades)
    .filter((skill) => skill.checked)
    .map((skill) => skill.id)

  if (temErro) {
    evento.preventDefault()
  }

  let serviceEntry = {
    nome: campoNome.value,
    sobrenome: campoSobrenome.value,
    email: campoEmail.value,
    website: campoSite.value,
    startDate: campoDataInicial.value,
    finalDate: campoDataFinal.value,
    region: regionValue,
    skills: skillsValue[0] + ',' + skillsValue[1] + ',' + skillsValue[2],
  }

  if (btnToggle == false) {
    newEntry(serviceEntry)
  } else {
    updateEntry(serviceEntry)
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

function newEntry(serviceEntry) {
  let id = entries.push(serviceEntry)
  let entriesText = JSON.stringify(entries)
  window.localStorage.setItem('Service Entries', entriesText)
  addTableEntry(serviceEntry, id)
}

function loadEntries() {
  entries = JSON.parse(window.localStorage.getItem('Service Entries'))
  for (let x = 0; x < entries.length; x++) {
    let serviceEntry = entries[x]
    if (serviceEntry != null) {
      addTableEntry(serviceEntry, x)
    }
  }
}

// carregar automaticamente as entradas no build da pagina
window.onload = loadEntries()

function addTableEntry(serviceEntry, id) {
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

function editEntry(editButton) {
  editValue = editButton.dataset.entryId

  campoNome.value = entries[editValue].nome
  campoSobrenome.value = entries[editValue].sobrenome
  campoEmail.value = entries[editValue].email
  campoWebsite.value = entries[editValue].website
  campoDataInicial.value = entries[editValue].startDate
  campoDataFinal.value = entries[editValue].finalDate

  //find the region value then check it
  for (let i = 0; i < campoRegioes.length; i++) {
    if (campoRegioes[i].id == entries[editValue].region) {
      campoRegioes[i].checked = true
    }
  }

  //find the skills values then checking it
  //split the skills string into an array and remove spaces
  const convertSkills = entries[editValue].skills.split(',').map((skill) => {
    return skill.trim()
  })

  for (let i = 0; i < habilidades.length; i++) {
    for (let j = 0; j < convertSkills.length; j++) {
      if (habilidades[i].id == convertSkills[j]) {
        habilidades[i].checked = true
      }
    }
  }

  //change submit button to update button
  //create or find update button
  btnToggle = true
  document.querySelector('.hide-submit').style.display = 'none'
  document.querySelector('.hide-update').style.display = 'block'
}

function deleteEntry(deleteButton) {
  let id = deleteButton.dataset.entryId
  delete entries[id - 1]
  window.localStorage.setItem('Service Entries', JSON.stringify(entries))
  let table = document.querySelector('#tabela-prestador-servico')
  let rowToDelete = deleteButton.parentNode.parentNode
  table.tBodies[0].removeChild(rowToDelete)
}

function updateEntry(serviceEntry) {
  //retrieve data
  const retrieveString = localStorage.getItem('Service Entries')
  const retrieveArray = JSON.parse(retrieveString)

  //update and convert data
  retrieveArray[editValue] = serviceEntry
  const modifedArray = JSON.stringify(retrieveArray)
  localStorage.setItem('Service Entries', modifedArray)
}
