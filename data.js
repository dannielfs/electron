const jsonfile = require('jsonfile-promised');
const fs = require('fs');

module.export = {

    salvaDados(curso, tempoEstudado) {

        let arquivoDoCurso = __dirname + '/data/' + curso + '.json';

        if(fs.existSync(arquivoDoCurso)) {

        } else {
            this.criaArquivoDeCurso(arquivoDoCurso, {}).then(
                () => {

                }
            )
        }
    },

    criaArquivoDeCurso(nomeDoArquivo, conteudoDoArquivo) {

        return jsonfile.writeFile(nomeDoArquivo, conteudoDoArquivo)
        .then(
            ()=> {}
        ).catch(
            (err) => console.log(err)
        )

    }

}