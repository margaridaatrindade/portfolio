'use strict';

const TABELA_PONTUACOES_FACIL1 = "tblPontuacoesFacil1";

const TABELA_PONTUACOES_MEDIO1 = "tblPontuacoesMedio1";

const TABELA_PONTUACOES_DIFICIL1 = "tblPontuacoesDificil1";

const TABELA_PONTUACOES_FACIL2 = "tblPontuacoesFacil2";

const TABELA_PONTUACOES_MEDIO2 = "tblPontuacoesMedio2";

const TABELA_PONTUACOES_DIFICIL2 = "tblPontuacoesDificil2";

const TABELA_PONTUACOES_FACIL3 = "tblPontuacoesFacil3";

const TABELA_PONTUACOES_MEDIO3 = "tblPontuacoesMedio3";

const TABELA_PONTUACOES_DIFICIL3 = "tblPontuacoesDificil3";

let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
let Tabelas = JSON.parse(localStorage.getItem('Tabelas'));

window.addEventListener("load", principal);

function principal() {

    mostraPontuacoes1();
    mostraPontuacoes2();
    mostraPontuacoes3();
    localStorage.setItem('Tabelas', JSON.stringify(Tabelas));

}

/*Tabela do modo Clássico*/ //MELHORAR CODIGO por de uma so forma e mudam variaveis

function mostraPontuacoes1() {

    if (Tabelas[0].length > 10 + jogadores.length) {
        Tabelas[0].pop()
    }
    if (Tabelas[1].length > 10 + jogadores.length) {
        Tabelas[1].pop()
    }
    if (Tabelas[2].length > 10 + jogadores.length) {
        Tabelas[2].pop()
    }


    let tabelaAntiga1 = document.getElementById(TABELA_PONTUACOES_FACIL1);
    let tabelaAntiga2 = document.getElementById(TABELA_PONTUACOES_MEDIO1);
    let tabelaAntiga3 = document.getElementById(TABELA_PONTUACOES_DIFICIL1);

    let tabelaNova1 = document.createElement("table");
    tabelaNova1.setAttribute("id", TABELA_PONTUACOES_FACIL1);

    let linhaTabela1 = document.createElement("tr");
    let linha2Tabela1 = document.createElement("tr");

    linha2Tabela1.innerHTML = "<th colspan='3'>Fácil</th>"
    tabelaNova1.appendChild(linha2Tabela1);
    linhaTabela1.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova1.appendChild(linhaTabela1);

    let numPosicao1 = 1;
    for (let jogador of Tabelas[0]) {
        if (jogador.tempo != 0) {

            linhaTabela1 = document.createElement("tr");
            linhaTabela1.innerHTML = "<td>" + numPosicao1 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova1.appendChild(linhaTabela1);
            numPosicao1++;
        }
    }

    /****************************/

    let tabelaNova2 = document.createElement("table");
    tabelaNova2.setAttribute("id", TABELA_PONTUACOES_MEDIO1);

    let linhaTabela2 = document.createElement("tr");
    let linha2Tabela2 = document.createElement("tr");

    linha2Tabela2.innerHTML = "<th colspan='3'>Médio</th>"
    tabelaNova2.appendChild(linha2Tabela2);
    linhaTabela2.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova2.appendChild(linhaTabela2);

    let numPosicao2 = 1;
    for (let jogador of Tabelas[1]) {
        if (jogador.tempo != 0) {

            linhaTabela2 = document.createElement("tr");
            linhaTabela2.innerHTML = "<td>" + numPosicao2 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova2.appendChild(linhaTabela2);
            numPosicao2++;
        }

    }

    /******************************/

    let tabelaNova3 = document.createElement("table");
    tabelaNova3.setAttribute("id", TABELA_PONTUACOES_DIFICIL1);

    let linhaTabela3 = document.createElement("tr");
    let linha2Tabela3 = document.createElement("tr");

    linha2Tabela3.innerHTML = "<th colspan='3'>Difícil</th>"
    tabelaNova3.appendChild(linha2Tabela3);
    linhaTabela3.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova3.appendChild(linhaTabela3);

    let numPosicao3 = 1;
    for (let jogador of Tabelas[2]) {
        if (jogador.tempo != 0) {

            linhaTabela3 = document.createElement("tr");
            linhaTabela3.innerHTML = "<td>" + numPosicao3 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova3.appendChild(linhaTabela3);
            numPosicao3++;
        }

    }

    tabelaAntiga1.parentNode.replaceChild(tabelaNova1, tabelaAntiga1);
    tabelaAntiga2.parentNode.replaceChild(tabelaNova2, tabelaAntiga2);
    tabelaAntiga3.parentNode.replaceChild(tabelaNova3, tabelaAntiga3);
}


/*Tabela do modo Time Rush*/

function mostraPontuacoes2() {

    if (Tabelas[3].length > 10 + jogadores.length) {
        Tabelas[3].pop()
    }
    if (Tabelas[4].length > 10 + jogadores.length) {
        Tabelas[4].pop()
    }
    if (Tabelas[5].length > 10 + jogadores.length) {
        Tabelas[5].pop()
    }

    let tabelaAntiga1 = document.getElementById(TABELA_PONTUACOES_FACIL2);
    let tabelaAntiga2 = document.getElementById(TABELA_PONTUACOES_MEDIO2);
    let tabelaAntiga3 = document.getElementById(TABELA_PONTUACOES_DIFICIL2);

    let tabelaNova1 = document.createElement("table");
    tabelaNova1.setAttribute("id", TABELA_PONTUACOES_FACIL2);

    let linhaTabela1 = document.createElement("tr");
    let linha2Tabela1 = document.createElement("tr");

    linha2Tabela1.innerHTML = "<th colspan='3'>Fácil</th>"
    tabelaNova1.appendChild(linha2Tabela1);
    linhaTabela1.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova1.appendChild(linhaTabela1);

    let numPosicao1 = 1;
    for (let jogador of Tabelas[3]) {
        if (jogador.tempo != 0) {

            linhaTabela1 = document.createElement("tr");
            linhaTabela1.innerHTML = "<td>" + numPosicao1 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova1.appendChild(linhaTabela1);
            numPosicao1++;
        }
    }

    /****************************/

    let tabelaNova2 = document.createElement("table");
    tabelaNova2.setAttribute("id", TABELA_PONTUACOES_MEDIO2);

    let linhaTabela2 = document.createElement("tr");
    let linha2Tabela2 = document.createElement("tr");

    linha2Tabela2.innerHTML = "<th colspan='3'>Médio</th>"
    tabelaNova2.appendChild(linha2Tabela2);
    linhaTabela2.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova2.appendChild(linhaTabela2);

    let numPosicao2 = 1;
    for (let jogador of Tabelas[4]) {
        if (jogador.tempo != 0) {

            linhaTabela2 = document.createElement("tr");
            linhaTabela2.innerHTML = "<td>" + numPosicao2 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova2.appendChild(linhaTabela2);
            numPosicao2++;
        }

    }

    /******************************/

    let tabelaNova3 = document.createElement("table");
    tabelaNova3.setAttribute("id", TABELA_PONTUACOES_DIFICIL2);

    let linhaTabela3 = document.createElement("tr");
    let linha2Tabela3 = document.createElement("tr");

    linha2Tabela3.innerHTML = "<th colspan='3'>Difícil</th>"
    tabelaNova3.appendChild(linha2Tabela3);
    linhaTabela3.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova3.appendChild(linhaTabela3);

    let numPosicao3 = 1;
    for (let jogador of Tabelas[5]) {
        if (jogador.tempo != 0) {

            linhaTabela3 = document.createElement("tr");
            linhaTabela3.innerHTML = "<td>" + numPosicao3 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova3.appendChild(linhaTabela3);
            numPosicao3++;
        }

    }

    tabelaAntiga1.parentNode.replaceChild(tabelaNova1, tabelaAntiga1);
    tabelaAntiga2.parentNode.replaceChild(tabelaNova2, tabelaAntiga2);
    tabelaAntiga3.parentNode.replaceChild(tabelaNova3, tabelaAntiga3);

}

/*Tabela do modo MAX Explore*/

function mostraPontuacoes3() {

    if (Tabelas[6].length > 10 + jogadores.length) {
        Tabelas[6].pop()
    }
    if (Tabelas[7].length > 10 + jogadores.length) {
        Tabelas[7].pop()
    }
    if (Tabelas[8].length > 10 + jogadores.length) {
        Tabelas[8].pop()
    }

    let tabelaAntiga1 = document.getElementById(TABELA_PONTUACOES_FACIL3);
    let tabelaAntiga2 = document.getElementById(TABELA_PONTUACOES_MEDIO3);
    let tabelaAntiga3 = document.getElementById(TABELA_PONTUACOES_DIFICIL3);

    let tabelaNova1 = document.createElement("table");
    tabelaNova1.setAttribute("id", TABELA_PONTUACOES_FACIL3);

    let linhaTabela1 = document.createElement("tr");
    let linha2Tabela1 = document.createElement("tr");

    linha2Tabela1.innerHTML = "<th colspan='3'>Fácil</th>"
    tabelaNova1.appendChild(linha2Tabela1);


    linhaTabela1.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova1.appendChild(linhaTabela1);

    let numPosicao1 = 1;
    for (let jogador of Tabelas[6]) {
        if (jogador.tempo != 0) {
            linhaTabela1 = document.createElement("tr");
            linhaTabela1.innerHTML =
                "<td>" + numPosicao1 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova1.appendChild(linhaTabela1);
            numPosicao1++;
        }
    }

    /****************************/

    let tabelaNova2 = document.createElement("table");
    tabelaNova2.setAttribute("id", TABELA_PONTUACOES_MEDIO3);

    let linhaTabela2 = document.createElement("tr");
    let linha2Tabela2 = document.createElement("tr");

    linha2Tabela2.innerHTML = "<th colspan='3'>Médio</th>"
    tabelaNova2.appendChild(linha2Tabela2);

    linhaTabela2.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova2.appendChild(linhaTabela2);

    let numPosicao2 = 1;
    for (let jogador of Tabelas[7]) {
        if (jogador.tempo != 0) {

            linhaTabela2 = document.createElement("tr");
            linhaTabela2.innerHTML = "<td>" + numPosicao2 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova2.appendChild(linhaTabela2);
            numPosicao2++;
        }

    }

    /******************************/

    let tabelaNova3 = document.createElement("table");
    tabelaNova3.setAttribute("id", TABELA_PONTUACOES_DIFICIL3);

    let linhaTabela3 = document.createElement("tr");
    let linha2Tabela3 = document.createElement("tr");

    linha2Tabela3.innerHTML = "<th colspan='3'>Difícil</th>"
    tabelaNova3.appendChild(linha2Tabela3);
    linhaTabela3.innerHTML = "<th>Posição</th>" +
        "<th>Nome do jogador</th>" +
        "<th>Tempo</th>";
    tabelaNova3.appendChild(linhaTabela3);

    let numPosicao3 = 1;
    for (let jogador of Tabelas[8]) {
        if (jogador.tempo != 0) {

            linhaTabela3 = document.createElement("tr");
            linhaTabela3.innerHTML = "<td>" + numPosicao3 + "</td>" +
                "<td>" + jogador.nome + "</td>" +
                "<td>" + jogador.tempo + "</td>";
            tabelaNova3.appendChild(linhaTabela3);
            numPosicao3++;
        }

    }

    tabelaAntiga1.parentNode.replaceChild(tabelaNova1, tabelaAntiga1);
    tabelaAntiga2.parentNode.replaceChild(tabelaNova2, tabelaAntiga2);
    tabelaAntiga3.parentNode.replaceChild(tabelaNova3, tabelaAntiga3);


}


/*Slides das várias tabelas de pontuações*/

let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
    //aqui dá erro pq da -1 quando slideIndex = 0 , mas a mostra todos os slides,
    // tentamos por guarda para não haver slides[-1], mas dessa fora deois não mostrava o slide[0]
    //portanto decidimos deixar o erro de forma a ser possivel ver todos os slides
} 