// ========= EXEMPLOS DE ESTILOS ======================

const estilo0 = '';

const estilo1 = String(`width: 200px;
height: 100px;
margin: 10px;
padding: 10px;
border: solid darkred;
border-width: 4px 8px 10px 12px;
text-align: left;
background-color: beige;
overflow-y: scroll;
`);

const estilo2 = String(`width: 200px;
height: 100px;
margin: 0px;
padding: 10px;
border: solid 20px darkred;
border-style: ridge;
text-align: left;
background-color: beige;
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 5;
line-clamp: inherit;
overflow: hidden;
text-overflow: ellipsis;
/* experimente descomentar uma das linhas abaixo */
box-sizing: content-box;
/* box-sizing: border-box; */
`);

const arrayEstilos = new Array();
arrayEstilos.push(estilo0);
arrayEstilos.push(estilo1);
arrayEstilos.push(estilo2);
    
// ========= PARA INTERAÇÃO COM O USUÁRIO ===============
function escolher() {
    let escolha = document.getElementById('dropbox').value;
    let estilo = '';
    document.getElementById("texto").value = arrayEstilos[escolha];
    estilo = '.estilo {' + arrayEstilos[escolha] + '}';
    document.getElementById('estilo-mutante').innerHTML = estilo;
    let element = document.getElementById('amostra');
    element.classList.remove(...element.classList);
    element.classList.toggle('estilo');
}

function enviar() {
    let conteudo = document.getElementById('texto').value;
    let estilo = '.estilo {' + conteudo + '}';
    document.getElementById('estilo-mutante').innerHTML = estilo;
    let element = document.getElementById('amostra');
    element.classList.remove(...element.classList);
    element.classList.toggle('estilo');
    console.log(conteudo);
}

// var element = document.getElementById('amostra');

