const { apiUrl, headers } = require('../model/headers')
const { getCodigoCliente } = require('./clienteAsaas')
const { addMonths, format } = require('date-fns')
const axios = require('axios');

async function listarAssinaturas(){
    try {
        console.log('listando assinaturas...')
        const {data} = await axios.get(`${apiUrl}subscriptions`, {headers})
        console.log('assinaturas listadas com sucesso!')
        return data
    } catch (error) {
        console.error(error)
        throw error
    }
    
}

function getDataFormatada() {
    const dataAtual = new Date()
    const dataProximoMes = addMonths(dataAtual, 1)
    const dataDiaCincoProximoMes = new Date(dataProximoMes.getFullYear(), dataProximoMes.getMonth(), 5)
    const dataFormatada = format(dataDiaCincoProximoMes, 'yyyy-MM-dd')
  
    return dataFormatada;
  }

async function criarNovaAssinatura(cpf, value){

    const costumer = await getCodigoCliente(cpf)
    console.log(costumer)

    try {
        const costumer = await getCodigoCliente(cpf)
        console.log(costumer)

        const assinatura = {
            customer: costumer,
            billingType: "UNDEFINED",
            value: value / 2 ,
            nextDueDate: getDataFormatada(),
            cycle: "MONTHLY",
            split: {
                walletid:'12763a38-bf30-491e-a872-f7767d168462',
                percentualValue: 100,
            }
        }

        const {data} = await axios.post(`${apiUrl}subscriptions`, assinatura, {headers})
        console.log('assinatura registrada com sucesso')
        
        return data

    } catch (error) {
        console.error(error)
        throw error
    }


}


module.exports = { listarAssinaturas, criarNovaAssinatura }