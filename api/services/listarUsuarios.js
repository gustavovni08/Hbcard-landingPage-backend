const { connect, closeConnection } = require('./connect');

async function listarUsuarios() {
  try {
    const db = await connect();

    const query = 'SELECT * FROM usuarios';

    return new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          console.error('Erro ao listar usuários:', err.message);
          reject(err);
        } else {
          console.log('Lista de usuários:', rows);
          resolve(rows);
        }

        // Fechar a conexão após listar os usuários
        closeConnection(db);
      });
    });
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados:', error.message);
    throw error;
  }
}

module.exports = { listarUsuarios };