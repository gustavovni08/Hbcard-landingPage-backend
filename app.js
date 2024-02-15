const express = require('express')

const app = express()
const port = 3000

const { 
        listarClientesAsaas, 
        cadastrarClienteAsaas, 
        getCodigoCliente, 
        buscarClientePorCpf 
      } = require('./api/services/clienteAsaas')

const { 
        getLinkCobranca, 
        criarCobrancaAsaas,
        criarCobrancaAsaasJoyce, 
        criarCobrancaAsaasMericia,
        criarCobrancaAsaasZenilson,
      } = require('./api/services/cobrançaAsaas')

const { listarAssinaturas, 
        criarNovaAssinatura, 
        criarNovaAssinaturaJoyce,
        criarNovaAssinaturaMericia, 
        criarNovaAssinaturaZenilson,
      } = require('./api/services/AssinaturasAsaas')

const {
  listarClientesTelemedicina, 
  cadastrarClienteTelemedicina,
      } = require('./api/services/clientesTelemedicina')


//middlewares
const bodyParser = require('body-parser')
app.use(bodyParser.json())

const cors = require('cors')
const { enviarEmail, enviarEmailPosCompra, enviarPlanilhaUsuarios } = require('./api/services/Nodemailer')

app.use(cors({
  origin: 'http://localhost:8080',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

require('dotenv').config();


//rota inicial
app.get('/', (req, res) => {
    res.send('Olá Mundo!')
})

//endpoints de comunicação com o localdatabase
app.post('/adicionar-usuario', async (req, res) => {
    try {
    
      const { cpf, nome, email, telefone, dataNascimento } = req.body;
  
      if (!cpf || !nome || !email || !telefone || !dataNascimento) {
        return res.status(400).json({ error: 'Dados incompletos. Certifique-se de fornecer todos os campos.' });
      }
  
      const resultadoInsercao = await cadastrarClienteTelemedicina(cpf, nome, email, telefone, dataNascimento);
    
      console.log('cadastrando cliente no asaas')
    
      await cadastrarClienteAsaas(cpf, nome, email, telefone)
  
      res.status(200).json({ message: 'Usuário adicionado com sucesso.'});
    
    } catch (error) {
    
      console.error('Erro ao processar requisição:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor.' });
    
    }
})
app.get('/listar-usuarios', async (req, res) => {
    
    try {
    
      console.log('Acessando a rota /listar-usuarios');

      const usuarios = await listarClientesTelemedicina();
      
      console.log('Lista de usuários:', usuarios);
      
      res.status(200).json({ message: 'Lista de usuários:', data: usuarios });
    
    } catch (error) {
      
      console.error('Erro ao processar requisição:', error.message);
      
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
})

//endpoints de comunicação com a api ASAAS
app.get('/listar-clientes-asaas', async (req, res) =>{
    try{
      const data = await listarClientesAsaas()

      res.status(200).json({ message: 'Lista de clientes cadastrados no Asaas:', data: data})
      
      console.log(data)

    } catch (error) {
      
      console.error('Erro ao processar requisição:', error.message);
      res.status(500).json({ error: 'Erro interno do servidor.' });

    }
})
app.get('/buscar-cliente-assas-por-cpf', async (req, res) => {
  try {
    const {cpf} = req.body
    const data = await buscarClientePorCpf(cpf)

    console.log(data)

    res.status(200).json({ message: 'cliente: ', data: data})
  
  } catch (error) {
  
    console.error('Erro ao processar requisição:', error.message);
  
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
})
app.get('/buscar-codigo-cliente-assas-por-cpf', async (req, res) => {
    try {

      const {cpf} = req.body
      const data = await getCodigoCliente(cpf)
      
      console.log(data);
      
      res.status(200).json({ message: 'cliente: ', data: data})
    
    } catch (error) {
    
      console.error('Erro ao processar requisição:', error.message);
    
      res.status(500).json({ error: 'Erro interno do servidor.' });
    }
})
app.post('/gerar-cobranca', async (req, res) =>{
  try {

    const {cpf, value} = req.body
    const costumer_code = await getCodigoCliente(cpf)

    const response = await criarCobrancaAsaas(costumer_code, value)
    
    console.log(response)
    
    res.status(200).json({ message: 'cobrança criada com sucesso ', data: response})
  
  } catch (error) {
  
    console.error('Erro ao processar requisição:', error.message);
  
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
})
app.get('/retornar-link-de-cobranca', async (req,res) => {
  try {
    const cpf = req.query.cpf
    const response = await getLinkCobranca(cpf)

    if (!cpf) {
      return res.status(400).json({ error: 'O CPF é obrigatório.' });
    }

    const link = response.data[0].invoiceUrl
    console.log('sua cobrança');
    console.log(link)
    res.status(200).json({ message: 'sua cobrança ', data: link})
  
  } catch (error) {
    console.error('Erro ao processar requisição:', error.message);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
})
app.get('/listar-assinaturas', async (req, res) => {
  try {
    const response = await listarAssinaturas()
    console.log(response)
    res.status(200).json({ message: 'suas assinaturas: ', data: response})
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
})
app.post('/gerar-assinatura', async (req, res) => {
  try {
    const {cpf, value} = req.body
    const response = await criarNovaAssinatura(cpf, value)
    res.status(200).json({ message: 'suas assinatura foi gerada com sucesso!'})

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor.', data:error });
  }
})

//endpoints personalizados para os vendedores
app.post('/gerar-cobranca-zenilson', async (req, res) =>{
  try {

    const {cpf, value} = req.body
    const costumer_code = await getCodigoCliente(cpf)

    const response = await criarCobrancaAsaasZenilson(costumer_code, value)
    
    console.log(response)
    
    res.status(200).json({ message: 'cobrança criada com sucesso ', data: response})
  
  } catch (error) {
  
    console.error('Erro ao processar requisição:', error.message);
  
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
})
app.post('/gerar-assinatura-zenilson', async (req, res) => {
  try {
    const {cpf, value} = req.body
    const response = await criarNovaAssinaturaZenilson(cpf, value)
    res.status(200).json({ message: 'suas assinatura foi gerada com sucesso!'})

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor.', data:error });
  }
})
app.post('/gerar-assinatura-mericia', async (req, res) => {
  try {
    const {cpf, value} = req.body
    const response = await criarNovaAssinaturaMericia(cpf, value)
    res.status(200).json({ message: 'suas assinatura foi gerada com sucesso!'})

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor.', data:error });
  }
})
app.post('/gerar-cobranca-mericia', async (req, res) =>{
  try {

    const {cpf, value} = req.body
    const costumer_code = await getCodigoCliente(cpf)

    const response = await criarCobrancaAsaasMericia(costumer_code, value)
    
    console.log(response)
    
    res.status(200).json({ message: 'cobrança criada com sucesso ', data: response})
  
  } catch (error) {
  
    console.error('Erro ao processar requisição:', error.message);
  
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
})
app.post('/gerar-assinatura-joyce', async (req, res) => {
  try {
    const {cpf, value} = req.body
    const response = await criarNovaAssinaturaJoyce(cpf, value)
    res.status(200).json({ message: 'suas assinatura foi gerada com sucesso!'})

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erro interno do servidor.', data:error });
  }
})
app.post('/gerar-cobranca-joyce', async (req, res) =>{
  try {

    const {cpf, value} = req.body
    const costumer_code = await getCodigoCliente(cpf)

    const response = await criarCobrancaAsaasJoyce(costumer_code, value)
    
    console.log(response)
    
    res.status(200).json({ message: 'cobrança criada com sucesso ', data: response})
  
  } catch (error) {
  
    console.error('Erro ao processar requisição:', error.message);
  
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
})

//endpoints nodemailer
app.post('/enviar-email', async (req, res) => {
  try {
    const response = await enviarEmail()
    res.status(200).json({ mensagem: 'E-mail enviado com sucesso!', info })
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao enviar e-mail', detalhes: error.message });
  }
})
app.post('/enviar-email-poscompra', async (req, res) => {
  const {email, nome} = req.body
  try {
    const response = await enviarEmailPosCompra(email, nome)
    res.status(200).json({ mensagem: 'E-mail enviado com sucesso!'})
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao enviar e-mail', detalhes: error.message });
  }
})
app.post('/enviar-planilha-clientes', async (req, res) =>{
  try {
    const response = await enviarPlanilhaUsuarios()
    res.status(200).json({ mensagem: 'E-mail enviado com sucesso!'})
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao enviar e-mail', detalhes: error.message });
  }
})



app.listen(port, () =>{
    console.log(`Servidor rodando em http://localhost:${port}`)
})