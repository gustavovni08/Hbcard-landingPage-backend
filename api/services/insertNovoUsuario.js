const {connect, closeConnection} = require('./connect')

function inserirUsuario(cpf, nome, email, telefone, dataNascimento) {
    return new Promise(async (resolve, reject) => {
      try {
        const db = await connect();
  
        // Inserir o usuário na tabela
        db.run(`
          INSERT INTO usuarios (cpf, nome, email, telefone, data_nascimento)
          VALUES (?, ?, ?, ?, ?)
        `, [cpf, nome, email, telefone, dataNascimento], (err) => {
          if (err) {
            console.error('Erro ao adicionar usuário:', err.message);
            reject(err);
          } else {
            console.log('Usuário adicionado com sucesso');
            resolve();
          }
  
          // Fechar a conexão após a inserção
          closeConnection(db);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

module.exports = {inserirUsuario}