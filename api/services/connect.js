const sqlite3 = require('sqlite3').verbose();
const config = require('../model/config')

function connect() {
    return new Promise((resolve, reject) => {
      const db = new sqlite3.Database(config.dbName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
        if (err) {
          console.error('Erro ao conectar ao banco de dados:', err.message);
          reject(err);
        } else {
          console.log('Conectado ao banco de dados SQLite');
          resolve(db);
        }
      });
    });
  }


  function closeConnection(db) {
    return new Promise((resolve, reject) => {
      db.close((err) => {
        if (err) {
          console.error('Erro ao fechar o banco de dados:', err.message);
          reject(err);
        } else {
          console.log('Conexão com o banco de dados fechada');
          resolve();
        }
      });
    });
  }

module.exports = {connect, closeConnection}