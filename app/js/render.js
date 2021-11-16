const { ipcRenderer } = require('electron');

let linkSobre = document.getElementById('link-sobre');

linkSobre.addEventListener('click', () => {

    ipcRenderer.send('abrir-janela-sobre');

})