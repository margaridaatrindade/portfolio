//em vez de subtrair
//fazer setTimeout e chamar verifica fim jogo e clear o interval
//AJUDA POR FAVOR EU NAO CONSIGO
//na tabela repete sempre o valor nao sei pq  --> adicionar nºjogo
//nao ordena entre nome diferente (nao sei pq pq se pser num compiler separado funciona)

"use strict";

/**lista de listas atributos*/
let ListaAtributos;

let Atributos;
let final;

let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
let jogadorAtual = JSON.parse(localStorage.getItem('JogadorAtual'));

let JogoAtual;
let DifculAtual;

let Tabelas = JSON.parse(localStorage.getItem('Tabelas'));
let TempoFinal; //para ir buscar e por na storage

let CorAtual = JSON.parse(localStorage.getItem('CorAtual')) || ['#7cc77c', '#898f55'];
let CorStandr = ['#7cc77c', '#898f55'];
localStorage.setItem('CorAtual', JSON.stringify(CorStandr));

let estado = 1; //Musica ligada = 1, desligada = 0


/* -----------------DECLARAÇÃO DE VARIÁVEIS------------------- */

/* Botões */
const TIMER_JOGO = 'timer';

const BTN_INICIO_JOGO = 'btnIniciar';

const BTN_RE_JOGO = 'btnReiniciar';

const BTN_SOM = "botaoSom";

const BANDEIRAS_REST = 'bandeiras';

const TEXT_MODAL = 'textModal';

const MSG_FIM = 'BOOM! GAME OVER';

const MSG_PAUSA = 'Jogo parado';

const MSG_GANHA = 'Parabéns! Venceu o jogo!'


/*Temporizadores*/

let temporizadorTempoJogo1;
let temporizadorTempoJogo2;
let temporizadorDuracaoMaxima;


let Componentes = {
    quadrados: [],
    bombas: 0, //medio 40,16,256; dificil 99,30,480; facil 10,9,81;
    nColunas: 0,
    NumQuadrados: 0,//se quiser mudar o tabuleiro, assim é mais fácil :)
    isGameOver: true,
    bandeiras: 0,
    inicio: 0,
    TempoRestante: 0,
    MaxExplorar: 0
}

window.addEventListener("load", principal);

function principal() {

    musica();
    PedeModoJogo();
    let audio = document.getElementById("audio");
    document.getElementById(BTN_INICIO_JOGO).addEventListener('click', function () { Iniciar() })
    document.getElementById(BTN_RE_JOGO).addEventListener('click', function () { location.reload() })
    document.getElementById(BTN_SOM).addEventListener('click', function () {
        if (estado == 0) {
            musica();
            estado = 1;
            this.innerHTML = '🔊'
            return
        }
        if (estado == 1) {
            audio.pause();
            audio.currentTime = 0;
            estado = 0;
            this.innerHTML = '🔇'
            return

        }

    });

}

/**
 * Inicia o jogo.
 */
function Iniciar() {

    Componentes.isGameOver = false;

    document.getElementById(BTN_INICIO_JOGO).disabled = true;

    Componentes.inicio = Math.floor(Date.now() / 1000);

    if (JogoAtual == 'TR') {
        temporizadorTempoJogo2 = setInterval(mostraTempoRestante, 1000);
        temporizadorDuracaoMaxima = setTimeout(verificaFimJogo, Componentes.TempoRestante * 1000);
    } else {
        temporizadorTempoJogo1 = setInterval(mostraTempoJogo, 1000);
    }

}

/**
 * Para o jogo.
 */
function Parar() {
    clearInterval(temporizadorTempoJogo1);
    clearInterval(temporizadorTempoJogo2);
    clearTimeout(temporizadorDuracaoMaxima);

}



/** Cria os quadrados do tabuleiro do jogo */
function criarBoard() {
    /* Tabuleiro Jogo */
    let board = document.getElementById('board');

    /** Cria lista dos atributos(bomba/nobomba) para depois distribuir a cada quadrado */
    let ListaBombas = Array(Componentes.bombas).fill('bomba'); /*cria array (lista) n (10) bombas*/
    let ListaNaoBombas = Array(Componentes.NumQuadrados - Componentes.bombas).fill('naoBomba'); /*cria array (lista) n (71) naoBombas*/
    Atributos = ListaBombas.concat(ListaNaoBombas); /*concatena as duas listas*/

    /** Baralha a ordem dos elementos da lista de atributos */
    for (let i = Componentes.NumQuadrados - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [Atributos[i], Atributos[j]] = [Atributos[j], Atributos[i]];
    }
    /**Cria os quadrados do tabuleiro */
    for (let i = 0; i < Componentes.NumQuadrados; i++) { /* cria 81 quadrados */
        const quadrado = document.createElement('div');
        quadrado.setAttribute('id', i); /* id do quadrado */
        quadrado.classList.add(Atributos[i]); /* atributo(bomba/nobomba) do quadrado */
        quadrado.classList.add('cor');
        board.appendChild(quadrado); /* adiciona quadrado ao tabuleiro */
        Componentes.quadrados.push(quadrado); /* adiciona quadrado ao array de quadrados */
        quadrado.addEventListener('click', function (x) { click(quadrado) })
        quadrado.addEventListener('contextmenu', function (x) {
            x.preventDefault();
            marcarBandeira(quadrado)
        })

    }
    //**muda para lista de lista */
    let linha = [];
    ListaAtributos = [];
    for (let x of Atributos) {
        linha.push(x);
        if (linha.length === Componentes.nColunas) {
            ListaAtributos.push(linha);
            linha = [];
        }
    }

    MudarCor(CorAtual);

}


function bomba(i, j) {
    return (0 <= i) && (i < ListaAtributos.length) && (0 <= j) && (j < ListaAtributos[0].length) && (ListaAtributos[i][j] == 'bomba')
}

function vizinhos() {
    let adj = [-1, 0, 1];
    let l_vizinhos = [];
    for (let i of adj) for (let j of adj) if (i != 0 || j != 0) {
        l_vizinhos.push([i, j]);
    }
    return l_vizinhos
}

function Contagem() {
    for (let r = 0; r < ListaAtributos.length; r++) {
        for (let c = 0; c < ListaAtributos[0].length; c++) {
            if (ListaAtributos[r][c] == 'naoBomba') {
                let numBomb = 0;
                for (let coor of vizinhos()) if (bomba(r + coor[0], c + coor[1])) {
                    numBomb = numBomb + 1;
                }
                ListaAtributos[r][c] = numBomb
            }


        }

    }
    final = ListaAtributos.flat()
    for (let i = 0; i < Componentes.NumQuadrados; i++) {
        if (final[i] != 'bomba') {
            let quad = document.getElementById(i);
            quad.setAttribute('data', final[i]);
        }
    }
}

/**
 * Recursiva que devolve coordenadas do quadrado !!!passar n a int antes n== id do quadrado
 */

function Coordenadas(n, linha = 0) {
    if (n < Componentes.nColunas) {
        return [[linha], [n]]
    } else {
        n = n - Componentes.nColunas;
        linha++
        return Coordenadas(n, linha)
    }
}


/**
 * Função que permite ver os valores dos quadrados 
 * em volta quando clica num com data = 0.
 */
function VerVizinhos(quadradoId) {

    let QuadCoor = Coordenadas(parseInt(quadradoId)); //Guarda as coordenadas do quadrado clicado

    for (let coor of vizinhos()) if (!bomba(parseInt(QuadCoor[0]) + parseInt(coor[0]), parseInt(QuadCoor[1]) + parseInt(coor[1]))) {
        let l = parseInt(QuadCoor[0]) + parseInt(coor[0]); //para facilitar leitura
        let c = parseInt(QuadCoor[1]) + parseInt(coor[1]);

        if ((0 <= l) && (l < ListaAtributos.length) && (0 <= c) && (c < ListaAtributos[0].length)) { //para assegurar q as coordenadas são válidas

            let vizinho = document.getElementById(String((l * Componentes.nColunas) + c));
            if (vizinho.classList.contains('bandeira') == false) {
                vizinho.classList.add('checked'); //adiciona a classe checked aos quadrados vizinho
                if (JogoAtual == 'ME') {
                    MaxExplore();
                }
                if (vizinho.getAttribute('data') != 0) {
                    vizinho.innerHTML = vizinho.getAttribute('data')   // Faz display do número associado(data) ao quadrado
                }
            }
        }

    }

}

function click(quadrado) {
    let quadradoId = quadrado.id;
    //se o jogo acabar e clicar no quadrado, ou se tiver classe checked ou bandeira, nada acontece
    if (Componentes.isGameOver || quadrado.classList.contains('checked') || quadrado.classList.contains('bandeira') || quadrado.classList.contains('duvida')) return
    if (quadrado.classList.contains('bomba')) {
        quadrado.innerHTML = '💣';
        setTimeout(verificaFimJogo(quadrado), 5000);
    } else {
        let contagem = quadrado.getAttribute('data')
        if (contagem != 0) {
            quadrado.classList.add('checked');
            quadrado.innerHTML = contagem;
            if (JogoAtual == 'ME') {
                MaxExplore();
            }
            MudarCor(CorAtual);

            return
        }
        VerVizinhos(quadradoId); //chama VerVizinhos quando contagem (data) = 0
    }
    quadrado.classList.add('checked');
    MudarCor(CorAtual);
}


/**
 * Função que permite ao utilizador marcar uma bandeira.
 */
function marcarBandeira(quadrado) {

    if (Componentes.isGameOver) return
    if (!quadrado.classList.contains('checked')) {
        if (quadrado.classList.contains('duvida') && quadrado.classList.contains('bandeira')) {
            quadrado.classList.remove('duvida');
            quadrado.classList.remove('bandeira');
            quadrado.innerHTML = '';
            return

        }

        if (!quadrado.classList.contains('bandeira')) {
            //quadrado.classList.remove('duvida');
            quadrado.classList.add('bandeira');
            quadrado.innerHTML = ' 🚩';
            Componentes.bandeiras = Componentes.bandeiras + 1;
            document.getElementById(BANDEIRAS_REST).innerHTML = Componentes.bombas - Componentes.bandeiras + '/' + Componentes.bombas;
            verificaVitoria()
            return
        }
        if (quadrado.classList.contains('bandeira') /*&& !quadrado.classList.contains('duvida')*/) {
            //quadrado.classList.remove('bandeira');
            quadrado.classList.add('duvida');
            quadrado.innerHTML = '🚩?';
            Componentes.bandeiras = Componentes.bandeiras - 1;
            document.getElementById(BANDEIRAS_REST).innerHTML = Componentes.bombas - Componentes.bandeiras + '/' + Componentes.bombas;
            return

        }
    }


}





/**
 * Função que verifica se o jogo terminou.(se utilizador marcar todas as bombas ou clicar numa bomba)
 */
function verificaFimJogo(quadrado) {

    /*mostra todas as bombas*/
    for (let i = 0; i < Componentes.NumQuadrados; i++) {
        if (document.getElementById(i).classList.contains('bomba')) {
            document.getElementById(i).innerHTML = '💣';
        }

    }
    Componentes.isGameOver = true;
    Parar();
    mostraModalJogo(MSG_FIM);
    //Quando o jogo acaba ou é game over, o jogador é direcionado para a página das pontuações
}

function verificaVitoria() {
    let certos = 0;
    for (let i = 0; i < Componentes.NumQuadrados; i++) {
        if (document.getElementById(i).classList.contains('bandeira') && document.getElementById(i).classList.contains('bomba')) {
            certos = certos + 1;
        }
    } if (certos === Componentes.bombas && (Componentes.bombas - Componentes.bandeiras) === 0) {
        mostraModalJogo(MSG_GANHA);
        for (let player of jogadores) {
            if (player['nome'] == jogadorAtual) {
                player['tipo_tempo'][DifculAtual][JogoAtual].push(TempoFinal)
                localStorage.setItem('jogadores', JSON.stringify(jogadores));
            }
        }
        Parar();
        AtualizaListaPontuacoes();
    }
}
/**
 * Funcao para o 3º modo de jogo
 */

function MaxExplore() {
    let explorados = document.querySelectorAll('.checked').length;
    if (explorados >= Componentes.MaxExplorar) {
        verificaFimJogo();
    }



}

function mostraModalJogo(msg) {
    let modal = document.getElementById("modalJogo");
    let span = document.getElementsByClassName("fechar")[0];
    let botao = document.getElementById('btnPontos');
    document.getElementById(TEXT_MODAL).innerHTML = msg;
    modal.style.display = "block";
    span.addEventListener('click', function () {
        modal.style.display = "none";
    })
    botao.addEventListener('click', function () {
        window.location.href = 'pontuacoes.html'
    })



}

function PedeModoJogo() {
    let modal = document.getElementById("modalJogo2");
    let span = document.getElementsByClassName("fechar")[0];

    let facil = document.getElementById('btnFacil');
    let medio = document.getElementById('btnMedio');
    let dificil = document.getElementById('btnDificil');

    let classico = document.getElementById('btnClassico');
    let timerush = document.getElementById('btnTimeRush');
    let maxexplore = document.getElementById('btnMaxExplore');

    modal.style.display = "block";
    span.addEventListener('click', function () {
        modal.style.display = "none";
    })
    maxexplore.addEventListener('click', function () {  //falta defenir este jogo (timers e companhias)

        facil.disabled = false;
        medio.disabled = false;
        dificil.disabled = false;
        JogoAtual = 'ME';

    })
    timerush.addEventListener('click', function () {  //falta defenir este jogo (timers e companhias)
        facil.disabled = false;
        medio.disabled = false;
        dificil.disabled = false;
        JogoAtual = 'TR';
    })
    classico.addEventListener('click', function () {
        facil.disabled = false;
        medio.disabled = false;
        dificil.disabled = false;
        JogoAtual = 'C';

    })
    facil.addEventListener('click', function () {
        if (JogoAtual === 'C') {
            DifculAtual = 0;
        } else if (JogoAtual === 'TR') {
            DifculAtual = 3;
        } else {
            DifculAtual = 6;
            document.getElementById('mudatext').innerHTML = 'Minas por descobrir (Exploração máx: 50):'
        }
        Componentes.bombas = 10;
        Componentes.nColunas = 9;
        Componentes.NumQuadrados = 81;
        Componentes.TempoRestante = 180;
        Componentes.MaxExplorar = 50;
        criarBoard();
        Contagem();
        for (let i = 0; i < Componentes.NumQuadrados; i++) {
            document.getElementById(i).style.width = '50px';
            document.getElementById(i).style.height = '50px';
        }
        document.getElementById('board').style.width = '450px';
        document.getElementById('board').style.height = '450px';
        modal.style.display = "none";
    })
    medio.addEventListener('click', function () {
        if (JogoAtual === 'C') {
            DifculAtual = 1;
        } else if (JogoAtual === 'TR') {
            DifculAtual = 4;
        } else {
            DifculAtual = 7;
            document.getElementById('mudatext').innerHTML = 'Minas por descobrir (Exploração máx: 80):'
        }
        Componentes.bombas = 40;
        Componentes.nColunas = 16;
        Componentes.NumQuadrados = 256;
        Componentes.TempoRestante = 120;
        Componentes.MaxExplorar = 80;
        criarBoard();
        Contagem();
        for (let i = 0; i < Componentes.NumQuadrados; i++) {
            document.getElementById(i).style.width = '30px';
            document.getElementById(i).style.height = '30px';
            document.getElementById(i).style.fontSize = 'small';
        }
        document.getElementById('board').style.width = '480px';
        document.getElementById('board').style.height = '480px';
        modal.style.display = "none";
    })
    dificil.addEventListener('click', function () {
        if (JogoAtual === 'C') {
            DifculAtual = 2;
        } else if (JogoAtual === 'TR') {
            DifculAtual = 5;
        } else {
            DifculAtual = 8;
            document.getElementById('mudatext').innerHTML = 'Minas por descobrir (Exploração máx: 180):'
        }
        Componentes.bombas = 99;
        Componentes.nColunas = 30;
        Componentes.NumQuadrados = 480;
        Componentes.TempoRestante = 60;
        Componentes.MaxExplorar = 180;
        criarBoard();
        Contagem();
        for (let i = 0; i < Componentes.NumQuadrados; i++) {
            document.getElementById(i).style.width = '25px';
            document.getElementById(i).style.height = '25px';
            document.getElementById(i).style.fontSize = 'x-small';
        }
        document.getElementById('board').style.width = '750px';
        document.getElementById('board').style.height = '400px';
        modal.style.display = "none";
    })


}

function AtualizaListaPontuacoes() {
    let novoTempo;
    for (let player of jogadores) {
        if (player['nome'] == jogadorAtual) {
            for (let i = 0; i < Tabelas[DifculAtual].length; i++) {
                if (Tabelas[DifculAtual][i]['nome'] == jogadorAtual) {
                    novoTempo = player['tipo_tempo'][DifculAtual][JogoAtual][player['tipo_tempo'][DifculAtual][JogoAtual].length - 1];
                }
            }
            Tabelas[DifculAtual].push({ 'nome': jogadorAtual, 'tempo': novoTempo });
            Tabelas[DifculAtual].sort(function (a, b) {
                if (a.tempo > b.tempo) {
                    return 1;
                }
                if (a.tempo < b.tempo) {
                    return -1;
                }
                return 0;
            });
            localStorage.setItem('Tabelas', JSON.stringify(Tabelas));
        }
    }
}



/* ---------------------------Timers---------------------------- */

function mostraTempoJogo() {

    let tempo = Math.floor(Date.now() / 1000) - Componentes.inicio;
    let tempoMin = Math.floor(tempo / 60);
    let tempoSeg = tempo % 60;

    document.getElementById(TIMER_JOGO).innerHTML = tempoMin + ':' + tempoSeg;
    TempoFinal = tempo;
}

function mostraTempoRestante() {
    let tempo = Componentes.TempoRestante - (Math.floor(Date.now() / 1000) - Componentes.inicio);
    let tempoMin = Math.floor(tempo / 60);
    let tempoSeg = tempo % 60;
    document.getElementById(TIMER_JOGO).innerHTML = tempoMin + ':' + tempoSeg;
    TempoFinal = (Math.floor(Date.now() / 1000) - Componentes.inicio);
}

/*-------Cores--------*/

function MudarCor(CorAtual) {

    let fundo = CorAtual[0];
    let borda = CorAtual[1];
    const squares = document.querySelectorAll('.cor');
    squares.forEach(square => {
        square.style.backgroundColor = fundo;
        square.style.borderColor = borda;
    });

    document.getElementById('board').style.backgroundColor = fundo;
    const checkados = document.querySelectorAll('.checked');
    checkados.forEach(checked => {
        checked.style.backgroundColor = borda;
        checked.style.borderColor = fundo;
    });


}

/*Audio*/

function musica() {
    let audio = document.getElementById("audio");

    if (estado = 1) {
        audio.loop = true;

    }
    estado = 1;
    audio.play();

}


