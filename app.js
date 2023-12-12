const express = require('express')

const app = express()
const port = 3000

const {inserirUsuario} = require('./api/services/insertNovoUsuario')
const {listarUsuarios} = require('./api/services/listarUsuarios')

const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));
// app.use(cors)

app.get('/', (req, res) => {
    res.send('Olá Mundo!')
})

// Rota para receber dados em JSON e realizar a inserção no banco de dados
app.post('/adicionar-usuario', async (req, res) => {
    try {
      const { cpf, nome, email, telefone, dataNascimento } = req.body;
  
      // Validar os dados recebidos, se necessário
      if (!cpf || !nome || !email || !telefone || !dataNascimento) {
        return res.status(400).json({ error: 'Dados incompletos. Certifique-se de fornecer todos os campos.' });
      }
  
      // Chamar a função de inserção
      const resultadoInsercao = await inserirUsuario(cpf, nome, email, telefone, dataNascimento);
  
      // Responder com sucesso e o ID do usuário inserido
      res.status(200).json({ message: 'Usuário adicionado com sucesso.'});
    } catch (error) {
      console.error('Erro ao processar requisição:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  })

  app.get('/listar-usuarios', async (req, res) => {
    try {
      console.log('Acessando a rota /listar-usuarios');
      const usuarios = await listarUsuarios();
      console.log('Lista de usuários:', usuarios);
      res.status(200).json({ message: 'Lista de usuários:', data: usuarios });
    } catch (error) {
      console.error('Erro ao processar requisição:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
  });

app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})