const { ipcRenderer, shell } = require('electron');
const process = require('process');

let sobreFechar = document.getElementById('link-fechar');
let sobreGit = document.getElementById('link-git');
let versao = document.getElementById('versao');

window.onload = () => {
    versao.textContent = process.versions.electron;
}

sobreFechar.addEventListener('click', () => {
    ipcRenderer.send('fechar-janela-sobre')
})

sobreGit.addEventListener('click', () => {
    shell.openExternal('https://github.com/dannielfs');
})