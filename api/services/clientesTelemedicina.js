const { connect, closeConnection } = require('./connect');
const { cadastrarClienteAsaas, getCodigoCliente} = require('./clienteAsaas')

async function listarClientesTelemedicina() {
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


async function cadastrarClienteTelemedicina(cpf, nome, email, telefone, dataNascimento) {
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


module.exports = { cadastrarClienteTelemedicina, listarClientesTelemedicina}