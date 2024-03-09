/* ---------------------------Definições---------------------------- */

'use strict';

let jogadores = JSON.parse(localStorage.getItem('jogadores')) || [];
let jogadorAtual = JSON.parse(localStorage.getItem('JogadorAtual'));

window.addEventListener("load", principal);

function principal() {
  ContaTempo();
  ContaJogos();
  document.getElementById('JogadorStats').innerHTML = 'Stats do Jogador ' + jogadorAtual + ' :'

}

function ContaTempo() {
  let tempo = 0;
  for (let player of jogadores) {
    if (player['nome'] == jogadorAtual) {
      for (let i = 0; i < 3; i++) {
        if (player['tipo_tempo'][i]['C'].length != 0) {
          for (let el of player['tipo_tempo'][i]['C']) {
            tempo = tempo + el;
          }
        }
      }
      for (let i = 3; i < 6; i++) {
        if (player['tipo_tempo'][i]['TR'].length != 0) {
          for (let el of player['tipo_tempo'][i]['TR']) {
            tempo = tempo + el;
          }
        }
      }
      for (let i = 6; i < 9; i++) {
        if (player['tipo_tempo'][i]['ME'].length != 0) {
          for (let el of player['tipo_tempo'][i]['ME']) {
            tempo = tempo + el;
          }
        }
      }
    }
  }
  document.getElementById("tempoDeJogo").innerHTML = 'Tempo jogado: ' + tempo + ' segundos';

}

function ContaJogos() {
  let jogos = 0;
  for (let player of jogadores) {
    if (player['nome'] == jogadorAtual) {
      for (let i = 0; i < 3; i++) {
        jogos = jogos + player['tipo_tempo'][i]['C'].length
      }
    }
    if (player['nome'] == jogadorAtual) {
      for (let i = 3; i < 6; i++) {
        jogos = jogos + player['tipo_tempo'][i]['TR'].length
      }
    }
    if (player['nome'] == jogadorAtual) {
      for (let i = 6; i < 9; i++) {
        jogos = jogos + player['tipo_tempo'][i]['ME'].length
      }
    }


  }
  document.getElementById("numeroDeJogo").innerHTML = 'Número de jogos ganhos:' + jogos;
}



//mudar de cor de elemento de html
function RecolheCores(id) {
  let CorAtual
  if (id === 'btnazul') {
    CorAtual = ['#9dc5fa', '#5d9df0'];
  }
  if (id === 'btnamarelo') {
    CorAtual = ["#fff280", "#f3d852"];
  }
  if (id === 'btnrosa') {
    CorAtual = ["#Ffb8d2", "#F174ad"];
  }
  if (id === 'btnverde') {
    CorAtual = ["#bcfbb9", "#7ce477"];
  }
  if (id === 'btnlaranja') {
    CorAtual = ["#f0aa7a", "#eb9258"];
  }
  if (id === 'btnroxo') {
    CorAtual = ["#ddbfec", "#a274cd"];
  }
  localStorage.setItem('CorAtual', JSON.stringify(CorAtual));
}

