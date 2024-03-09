'use strict';

/* ---------------------------DADOS NO LOCAL STORAGE---------------------------- */

const FORMULARIO_JOGADOR = 'frmJogador';

const BOTAO_CRIA_JOGADOR = "btnCriaJogador";

const BOTAO_FAZ_REGISTO = 'btnLogin';

const NOME_INSERIDO = 'playername';

const PASS_INSERIDA = 'pass';

/** Item de local storage que guarda o histório de encomendas. */
const ITEM_DADOS = 'jogadores';

let jogadores = [];
let jogadorAtual;
let Tabelas = JSON.parse(localStorage.getItem('Tabelas')) || [[], [], [], [], [], [], [], [], []];
let formulario = null;



window.addEventListener("load", principal);

function principal() {

  formulario = document.forms[FORMULARIO_JOGADOR];


  carregaHistoricoJogadores();

  defineEventHandlersParaElementosHTML();
}


function defineEventHandlersParaElementosHTML() {

  document.getElementById(BOTAO_CRIA_JOGADOR).
    addEventListener("click", trataCriarJogador);

  document.getElementById(BOTAO_FAZ_REGISTO).
    addEventListener("click", VerificaRegisto);

}

function VerificaRegisto() {
  let nome = document.getElementById(NOME_INSERIDO).value;
  let pass = document.getElementById(PASS_INSERIDA).value;
  if (localStorage.getItem(ITEM_DADOS) === null) {
    mostraModalDados();
  }
  for (let player of jogadores) {
    if (player['nome'] == nome && player['senha'] == pass) {
      jogadorAtual = nome;
      localStorage.setItem('JogadorAtual', JSON.stringify(jogadorAtual));
      window.location.href = 'jogo.html';
      return
    } else if (player['nome'] == nome && player['senha'] != pass) {
      alert('Senha incorreta');
      return
    }
    mostraModalDados();
  }


}

function mostraModalDados() {
  let modal = document.getElementById("modalDados");
  let span = document.getElementsByClassName("fechar")[0];
  modal.style.display = "block";
  span.addEventListener('click', function () {
    modal.style.display = "none";
  })

}

function ObtemDadosJogador() {
  let nome = formulario.elements['nome'].value;
  let email = formulario.elements['email'].value;
  let faixa = formulario.elements['faixa'].value;
  let genero = formulario.elements['gender'].value;
  let senha = formulario.elements['senha'].value;
  let tipo_tempo = [{ 'C': [] }, { 'C': [] }, { 'C': [] }, { 'TR': [] }, { 'TR': [] }, { 'TR': [] }, { 'ME': [] }, { 'ME': [] }, { 'ME': [] }] //POR ordem facil,medio,dificil,em classico e timerush

  return new Jogador(nome, email, faixa, genero, senha, tipo_tempo);
}

function Jogador(nome, email, faixa, genero, senha, tipo_tempo) {
  this.nome = nome;
  this.email = email;
  this.faixa = faixa;
  this.genero = genero;
  this.senha = senha;
  this.tipo_tempo = tipo_tempo;
}



/* ------------------------------------------------------------------------- */


function trataCriarJogador() {


  let registoValido = formulario.reportValidity();


  let jogador = null;

  if (registoValido) {

    jogador = ObtemDadosJogador();
    jogadorAtual = formulario.elements['nome'].value;
    localStorage.setItem('JogadorAtual', JSON.stringify(jogadorAtual));

    gravaJogadorNoHistorico(jogador);

    formulario.reset();
    window.location.href = "jogo.html";
  }
}


function carregaHistoricoJogadores() {

  // Converte o histórico de pontuações guardado em formato JSON (JavaScript
  // Object Notation) no local storage do browser, para um objeto em memória.
  jogadores = JSON.parse(localStorage.getItem(ITEM_DADOS)) || [];

}

/* ------------------------------------------------------------------------- */

/**
 * Grava o histórico de pontuacoes no local storage do browser.
 */
function gravaHistoricoPontuacoes() {
  // Converte o objeto que representa o histórico de pontuacoes para texto em
  // formato JSON (JavaScript Object Notation), e guardado-o em local storage
  // do browser.
  localStorage.setItem(ITEM_DADOS, JSON.stringify(jogadores));

  for (let player of jogadores) {
    if (player['nome'] == jogadorAtual) {
      for (let i = 0; i < Tabelas.length; i++) {
        Tabelas[i].push({ 'nome': jogadorAtual, 'tempo': 0 })
      }

      localStorage.setItem('Tabelas', JSON.stringify(Tabelas));
    }
  }
}

/* ------------------------------------------------------------------------- */


function gravaJogadorNoHistorico(jogador) {

  // Coloca a encomenda no histórico e guarda-o no local storage do browser.
  jogadores.push(jogador);
  gravaHistoricoPontuacoes();
}

