class Contato {
    constructor(id, nome, email) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.marcado = false;
    }
}

var editando = false;
var arrayContatos = [];
var idCount = 0;

// =================================================
//      CONSTRUÇÃO DE ELEMENTOS GRÁFICOS
// =================================================

function mostraNaTela() {
    const area = document.getElementById('contatos');
    let conteudo = '';
    let registroAtual = '';
    let nome = '';
    let email = '';
    let selecionado = false;
    let id = 0;
    for (let c of arrayContatos) {
        id = c.id;
        nome = c.nome;
        email = c.email;
        selecionado = c.marcado;
        registroAtual = `<div class="registro">`;
        if (!selecionado) {
            registroAtual += `<input type="checkbox" onchange="mude(${id})">`;
        } else {
            registroAtual += `<input type="checkbox" checked onchange="mude(${id})">`;
        }
        registroAtual += `<div class="contato">${nome}</div>`;
        registroAtual += `<div class="email">${email}</div>`;
        registroAtual += `</div>`;
        conteudo += registroAtual;
    }
    area.innerHTML = conteudo;

}

// =================================================
//      ALTERAÇÕES NOS DADOS
// =================================================

function mude(id) {
    if (editando) {
        mostraNaTela();
        return;
    }
    for (contato of arrayContatos) {
        if (contato.id == id) {
            contato.marcado = !contato.marcado;
            mostraNaTela();
            return;
        }
    }
}

function removerMarcados() {
    if (editando) return;
    for (let i = 0; i < arrayContatos.length; i++) {
        if (arrayContatos[i].marcado) {
            delete arrayContatos[i];
        }
    }
    arrayContatos = arrayContatos.filter(elemento => elemento !== null);
    mostraNaTela();
}

function reset() {
    if (editando) return;
    resetDados();
    mostraNaTela();
}

// Mostra input de novo contato
function novoContato() {
    if (editando) return;
    editando = true;
    const novo = document.getElementById('novo');
    novo.classList.remove('novo-escondido');
    novo.classList.add('novo-visivel');
}

function marcarTudo() {
    if (editando) return;
    for (contato of arrayContatos) {
        contato.marcado = true;
    }
    mostraNaTela();
}

function desmarcarTudo() {
    if (editando) return;
    for (contato of arrayContatos) {
        contato.marcado = false;
    }
    mostraNaTela();
}


function adicionarContato() {
    editando = false;
    let nome = document.getElementById('nome').value;
    let email = document.getElementById('email').value;
    if (!contatoValidado(nome, email)) {
        editando = false;
        const novo = document.getElementById('novo');
        novo.classList.remove('novo-visivel');
        novo.classList.add('novo-escondido');
        nome.value = '';
        email.value = '';
        return;
    }
    insereNoArrayContatos(nome, email);
    const novo = document.getElementById('novo');
    novo.classList.remove('novo-visivel');
    novo.classList.add('novo-escondido');
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    mostraNaTela();
}

function contatoValidado(nome, email) {
    nome = nome.trim();
    email = email.trim();
    if (nome == '' || email == '') return false;
    return true;
}

function cancel() {
    editando = false;
    const novo = document.getElementById('novo');
    novo.classList.remove('novo-visivel');
    novo.classList.add('novo-escondido');
    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
}


// =================================================
//      SOBRE DADOS
// =================================================

function insereNoArrayContatos(nome, mail) {
    arrayContatos.push(new Contato(++idCount, nome, mail));
}

function resetDados() {
    arrayContatos = [];
    insereNoArrayContatos("Alan Turing", "turing@email.com");
    insereNoArrayContatos("Lunus Torvalds", "lunus@email.com");
    insereNoArrayContatos("John von Neumann", "neumann@email.com");
    insereNoArrayContatos("Albert Einstein", "einstein@email.com");
}





// =================================================
//      INICIANDO TUDO
// =================================================

resetDados();
mostraNaTela();

