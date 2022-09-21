
let contatos = [];


document.querySelector('#btn-adicionar').addEventListener('click', function(evento) {
    adicionarContato();
});

carregarContatos();

//document.querySelector('#titulo').innerHTML = window.localStorage.getItem('nome');




function adicionarContato() {

    let elNome = document.querySelector('#nome');
    let elGenero = document.querySelector('#genero');
    let elEndereco = document.querySelector('#endereco');

    let validado = true;

    elNome.parentNode.querySelector('.error').style.display = 'none';
    if (elNome.value.trim() == ''){
        elNome.parentNode.querySelector('.error').style.display = 'block';
        validado = false;
        //return;
    }

    elEndereco.parentNode.querySelector('.error').style.display = 'none';
    if (elEndereco.value.trim() == ''){
        elEndereco.parentNode.querySelector('.error').style.display = 'block';
        validado = false;
       // return;
    }

    if (validado) {
        let contato = {
            nome: elNome.value,
            genero: elGenero.value,
            endereco: elEndereco.value
        };
        novoContato(contato);
    }


    //console.log(nome.value, genero.value, endereco.value);
}


function novoContato(contato) {
    let id = contatos.push(contato);
    let contatosTexto = JSON.stringify(contatos);
    window.localStorage.setItem('contatos',contatosTexto);
    adicionarItemTabela(contato, id);
}


function carregarContatos() {
    contatos = JSON.parse(window.localStorage.getItem('contatos'));
    let tabela = document.querySelector('#tabela-agenda');
    for (let x=0; x < contatos.length; x++){
        let contato = contatos[x];
        if (contato != null) {
            adicionarItemTabela(contato, x);
        }
    }
}

function adicionarItemTabela(contato, id) {
    let tabela = document.querySelector('#tabela-agenda');
    let linha = tabela.tBodies[0].insertRow();
    let celulaNome = linha.insertCell();
    let celulaGenero = linha.insertCell();
    let celulaEndereco = linha.insertCell();
    let celulaAcao = linha.insertCell();
    celulaNome.textContent = contato.nome;
    celulaGenero.textContent = contato.genero;
    celulaEndereco.textContent = contato.endereco;
    let botao = document.createElement('button');
    botao.className = 'btn btn-danger';
    botao.innerText = 'Excluir';
    botao.dataset.contatoid = id;
    celulaAcao.appendChild(botao);
    botao.addEventListener('click',(evento) => {
        console.log(evento.target.dataset.contatoid);
        removerContato(evento.target);
    });
}

function removerContato(botao) {
    let id = botao.dataset.contatoid;
    delete contatos[id];
    window.localStorage.setItem('contatos',JSON.stringify(contatos));
    let tabela = document.querySelector('#tabela-agenda');
    let linhaParaRemover = botao.parentNode.parentNode;
    tabela.tBodies[0].removeChild(linhaParaRemover);
}