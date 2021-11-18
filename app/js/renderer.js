const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require('../../data')

let imgs = ['img/play-button.svg', 'img/stop-button.svg'];

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector('.curso');
let play = false;

window.onload = () => {
  data.pegaDados(curso.textContent)
    .then(
      (res) => {
        tempo.textContent = res.tempo;
      }
    )
}

linkSobre.addEventListener('click', function () {
  ipcRenderer.send('abrir-janela-sobre');
});

botaoPlay.addEventListener('click', () => {
  if (play) {
    timer.parar(curso.textContent);
    play = false;
  } else {
    timer.iniciar(tempo);
    play = true;
  }
  imgs = imgs.reverse();
  botaoPlay.src = imgs[0];
})

ipcRenderer.on('curso-trocado', (event, nomeCurso) => {
  data.pegaDados(nomeCurso)
    .then(
      (dados) => tempo.textContent = dados.tempo
    ).catch(
      (err) => console.log(err)
    )
  curso.textContent = nomeCurso;
})