
// ============ COMPONENTES ===========================

function pagHome() {
    restauraOpcoes();

    const minhaSection = document.getElementById('minha-section');

    fetch('home.html')
        .then(response => response.text())
        .then(dados => {
            minhaSection.innerHTML = dados;
        })
        .catch(
            e => {
                console.log('Ocorreu este erro aqui: ' + e);
            }
        );
}

function pagInstitucional() {
    restauraOpcoes();

    const minhaSection = document.getElementById('minha-section');

    document.getElementById('id_inst').style.backgroundColor = 'black';

    fetch('/institucional.html')
        .then(response => response.text())
        .then(dados => {
            minhaSection.innerHTML = dados;
            // document.getElementById('canvas-section').style.visibility = 'hidden';
        })
        .catch(
            e => {
                console.log('Ocorreu este erro aqui: ' + e);
            }
        );
}

function pagAlunos() {
    restauraOpcoes();

    const minhaSection = document.getElementById('minha-section');

    document.getElementById('id_alunos').style.backgroundColor = 'black';

    fetch('alunos.html')
        .then(response => response.text())
        .then(dados => {
            minhaSection.innerHTML = dados;
            document.getElementById('slot-alunos').innerHTML = getCardsAlunos();
        })
        .catch(
            e => {
                console.log('Ocorreu este erro aqui: ' + e);
            }
        );
}

function pagMatricula() {
    restauraOpcoes();

    const minhaSection = document.getElementById('minha-section');

    document.getElementById('id_matricula').style.backgroundColor = 'black';

    fetch('matricula.html')
        .then(response => response.text())
        .then(dados => {
            minhaSection.innerHTML = dados;
        })
        .catch(
            e => {
                console.log('Ocorreu este erro aqui: ' + e);
            }
        );
}

function getAlunoCardTemplate() {
    fetch('assets/templates/alunoCardTemplate.html')
        .then(response => response.text())
        .then(dados => {
            templateCard = dados;
        })
}


function restauraOpcoes() {
    document.getElementById('id_inst').style.backgroundColor = '#555';
    document.getElementById('id_alunos').style.backgroundColor = '#555';
    document.getElementById('id_matricula').style.backgroundColor = '#555';
}

// ========== DEFINIÇõES DE CLASSES E OBJETOS ===================

class Aluno {
    constructor(id, nome, cpf, matricula, nota1, nota2) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.matricula = matricula;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.media = 0;
        this.resultado = '';
        this.calcMedia();
    }
    calcMedia() {
        this.media = (this.nota1 + this.nota2) / 2;
        if (this.media >= 6) {
            this.resultado = 'Aprovado';
        } else {
            this.resultado = 'Reprovado';
        }
    }
}

function gerarAlunosDefault() {
    let a = new Array();
    a.push(
        new Aluno(++countId, 'Einstein', '045.546.123-33', '200045678', 10, 10)
    );
    a.push(
        new Aluno(++countId, 'Bill Gates', '365.342.690-23', '200088465', 7.5, 8)
    );
    a.push(
        new Aluno(++countId, 'Conan o Bárbaro', '856.957.154-12', '200084779', 1.4, 0.8)
    );
    a.push(
        new Aluno(++countId, 'Scooby-Doo', '123.498.178-76', '2000147935', 9.4, 8.2)
    );
    a.push(
        new Aluno(++countId, 'Galinha Pintadinha', '809.234.132-76', '2000144785', 6.5, 9)
    );
    a.push(
        new Aluno(++countId, 'Tio Patinhas', '812.745.131-16', '200047243', 7.1, 3.1)
    );
    return a;
}


// ========= MANIPULAÇÃO DA LISTA DOS ALUNOS ==============

function getUmCardPreenchido(aluno) {
    let resposta = templateCard.replace(/\${(.*?)}/g,
        (string, atr) => aluno[atr] || ''
    );
    return resposta;
}

function getCardsAlunos() {
    let conteudoAlunos = '';
    for (let a of alunos) {
        conteudoAlunos += getUmCardPreenchido(a);
    }
    return conteudoAlunos;
}


// ========= INTERAÇÃO COM O USUÁRIO ===================

function edit(id) {
    // procura a posição do elemento a ser editado
    let pos = 0;
    for (let i in alunos) {
        if (alunos[i].id == id) {
            pos = i;
            break;
        }
    }
    let a = alunos[pos];

    restauraOpcoes();

    const minhaSection = document.getElementById('minha-section');

    document.getElementById('id_matricula').style.backgroundColor = 'black';

    fetch('matricula.html')
        .then(response => response.text())
        .then(dados => {
            minhaSection.innerHTML = dados;
            document.getElementById('matr-titulo').innerText = 'EDITANDO ALUNO';
            document.getElementById('id-matr-id').innerText = id;
            document.getElementById('id-matr-nome').value = a.nome;
            document.getElementById('id-matr-matricula').value = a.matricula;
            document.getElementById('id-matr-cpf').value = a.cpf;
            document.getElementById('id-matr-nota1').value = a.nota1;
            document.getElementById('id-matr-nota2').value = a.nota2;
        })
        .catch(
            e => {
                console.log('Ocorreu este erro aqui: ' + e);
            }
        );

}

function del(id) {
    // procura a posição do elemento a ser removido
    let pos = 0;
    for (let i in alunos) {
        if (alunos[i].id == id) {
            pos = i;
            break;
        }
    }
    alunos.splice(pos, 1);
    pagAlunos();
}

// ordena em ordem de nome crescente
function ordNomeCresc() {
    alunos.sort(
        (depois, antes) => {
            if (depois.nome > antes.nome) {
                return 1;
            }
            return -1;
        }
    );
    pagAlunos();
}

// ordena em ordem de nome decrescente
function ordNomeDec() {
    alunos.sort(
        (depois, antes) => {
            if (depois.nome < antes.nome) {
                return 1;
            }
            return -1;
        }
    );
    pagAlunos();
}

// ordena em ordem de nota média crescente
function ordNotaCresc() {
    alunos.sort(
        (depois, antes) => {
            if (depois.media > antes.media) {
                return 1;
            }
            return -1;
        }
    );
    pagAlunos();
}

// ordena em ordem de nota média crescente
function ordNotaDec() {
    alunos.sort(
        (depois, antes) => {
            if (depois.media < antes.media) {
                return 1;
            }
            return -1;
        }
    );
    pagAlunos();
}

// MATRICULA ou EDITA aluno
function matricular() {
    let id = document.getElementById('id-matr-id').innerText;
    let nome = document.getElementById('id-matr-nome').value;
    let matricula = document.getElementById('id-matr-matricula').value;
    let cpf = document.getElementById('id-matr-cpf').value;
    let nota1 = Number(document.getElementById('id-matr-nota1').value);
    let nota2 = Number(document.getElementById('id-matr-nota2').value);

    if (id === "-1") {
        let aluno = new Aluno(++countId, nome, cpf, matricula, nota1, nota2);
        alunos.push(aluno);
        pagAlunos();
    } else {
        let indice = 0;
        for (let i in alunos) {
            if (alunos[i].id == id) {
                indice = i;
                break;
            }
        }
        alunos[indice].nome = nome;
        alunos[indice].matricula = matricula;
        alunos[indice].cpf = cpf;
        alunos[indice].nota1 = nota1;
        alunos[indice].nota2 = nota2;
        alunos[indice].calcMedia();
        pagAlunos();
    }
}

// CANCELAR a MATRÍCULA ou a EDIÇÃO
function cancelarMatricula() {
    pagAlunos();
}

/* *********************************************************************

        INICIALIZAÇÃO DA PÁGINA

********************************************************************* */

// contagem dos ids
var countId = 0;

// componente default
pagInstitucional();



// Obtendo dados
var alunos = gerarAlunosDefault();

// Criando o template do card dos alunos
var templateCard;
getAlunoCardTemplate();


