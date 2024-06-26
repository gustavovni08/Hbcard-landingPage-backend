const axios = require('axios')
const {apiUrl, headers} = require('../model/headers')

async function listarClientesAsaas(){
    try {
        const {data} = await axios.get(`${apiUrl}customers`, {headers})
        return data
    } catch (error) {
        throw error
    }

}

async function buscarClientePorCpf(cpf){
    
    console.log('buscando cliente de cpf:' + cpf)
    
    try {
        const {data} = await axios.get(`${apiUrl}customers?cpfCnpj=${cpf}`, {headers})
        const cliente = data.data[0].id
        return cliente
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function getCodigoCliente(cpf) {
    try {
      const response = await buscarClientePorCpf(cpf);
      const codigoCliente = response
      return codigoCliente

    } catch (error) {
      console.error('Erro ao obter código do cliente:', error);
      throw error;
    }
  }

async function cadastrarClienteAsaas(cpf, nome, email, telefone){
    try {
        const body = {
            name: nome,
            cpfCnpj: cpf,
            email: email,
            phone: telefone,
            mobilePhone: telefone,
        }

        const response = await axios.post(`${apiUrl}customers`, body, {headers})
        console.log('cliente inserido com sucesso')
        return response.data

    } catch (error) {
        throw error
    }

}


module.exports = {
    listarClientesAsaas, 
    buscarClientePorCpf, 
    cadastrarClienteAsaas, 
    getCodigoCliente 
}