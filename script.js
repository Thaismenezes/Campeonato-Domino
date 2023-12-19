const tabelaJogadores = document.querySelector('#tabelaJogadores');
const nomeInput = document.querySelector('#campoNomeJogador');
const btnCriarJogador = document.querySelector('.btnCriarJogador');
var listaJogadores = [];

atualizaTela();

nomeInput.addEventListener('keypress', event =>{
    const nomeValue = nomeInput.value;

    if(event.key == 'Enter' && nomeValue != ""){
        adicionaJogador();
    }
})

function criarJogador(){
    const nomeValue = nomeInput.value;

    if(nomeValue != ""){
        adicionaJogador();
    }
}


function adicionaJogador() {
    const nomeValue = nomeInput.value;

    if(nomeValue.length > 15){
        alert("Registre um nome menor, permitido 15 caractéres");
        return;
    }

    if (nomeExistente(nomeValue)){
        alert("Jogador já cadastrado!");
        return;
    }

    if(listaJogadores.length >=21){
        alert("Número limite de jogadores foi alcançado!");
        return;
    }

    listaJogadores.push({
        nome: nomeValue,
        vitorias: 0,
        empates: 0,
        derrotas: 0,
        pontos: 0
    })

   setJogador();    
}


function setJogador(){
    localStorage.setItem('listaDeJogadores', JSON.stringify(listaJogadores));
    atualizaTela();
}


function atualizaTela(){
    tabelaJogadores.innerHTML = "";

    listaJogadores = JSON.parse(localStorage.getItem('listaDeJogadores')) ?? [];

        
    listaJogadores.forEach((jogador, index) =>{
        const colunaTabela = document.createElement('tr');
        colunaTabela.innerHTML = `
            <td>${index}</td>
            <td>${jogador.nome}</td>
            <td>${jogador.vitorias}</td>
            <td>${jogador.empates}</td>
            <td>${jogador.derrotas}</td>
            <td>${jogador.pontos}</td>
            <td>
                <button onClick="adicionarVitoria(${index})">Vitória</button></td>
            <td>
                <button onClick="adicionarEmpate(${index})">Empate</button></td>
            <td>
                <button onClick="adicionarDerrota(${index})">Derrota</button></td>
            <td>    
                <button onClick="limparPontuacaoJogador(${index})">Zerar</button></td>
            <td>
                <button onClick="removerJogador(${index})">
                <i class="bi bi-trash3"></i></button>
            </td>
        `
        tabelaJogadores.appendChild(colunaTabela);
    })

    nomeInput.value = "";
}

function adicionarVitoria(index){
    listaJogadores[index].vitorias ++;
    listaJogadores[index].pontos += 3;
    setJogador()
}

function adicionarDerrota(index){
    listaJogadores[index].derrotas ++;
    listaJogadores[index].pontos -= 3;
    setJogador()
}

function adicionarEmpate(index){
    listaJogadores[index].empates ++;
    listaJogadores[index].pontos -= 1;
    setJogador()
}

function limparPontuacaoJogador(index){
    listaJogadores[index].vitorias = 0;
    listaJogadores[index].derrotas = 0;
    listaJogadores[index].empates = 0;
    listaJogadores[index].pontos = 0;
    setJogador()
}

function removerJogador(index){
    listaJogadores.splice(index, 1);
    setJogador()
}

function apagarJogadores(){
    listaJogadores = [];
    setJogador()
}

function nomeExistente(nome) {
    return listaJogadores.some(jogador => jogador.nome === nome);
}






  




