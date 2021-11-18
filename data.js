const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {

  salvaDados(curso, tempoEstudado) {

    let arquivoDoCurso = __dirname + '/data/' + curso + '.json';

    if (fs.existsSync(arquivoDoCurso)) {
      this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
    } else {
      this.criaArquivoDeCurso(arquivoDoCurso, {})
        .then(
          () => {
            this.adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado);
          }
        )
    }
  },

  criaArquivoDeCurso(nomeArquivo, conteudoArquivo) {
    return jsonfile.writeFile(nomeArquivo, conteudoArquivo)
      .then(() => {
        console.log('Arquivo Criado')
      }).catch((err) => {
        console.log(err);
      });
  },

  adicionaTempoAoCurso(arquivoDoCurso, tempo) {
    
    let dados = {
      ultimoEstudo: new Date(),
      tempo: tempo
    }

    jsonfile.writeFile(arquivoDoCurso, dados, {spaces: 2})
      .then(
        () => console.log('Tempo salvo com sucesso.')
      )
      .catch(
        (err) => console.log(err)
      )
  },

  pegaDados(curso) {
    let arquivoDoCurso = __dirname + '/data/' + curso + '.json';
    return jsonfile.readFile(arquivoDoCurso);
  }
}