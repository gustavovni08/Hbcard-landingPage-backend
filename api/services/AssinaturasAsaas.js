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
            split: [
                {
                walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
                percentualValue: 20,
            }
            ]
        }

        const {data} = await axios.post(`${apiUrl}subscriptions`, assinatura, {headers})
        console.log('assinatura registrada com sucesso')
        
        return data

    } catch (error) {
        console.error(error)
        throw error
    }


}

async function criarNovaAssinaturaZenilson(cpf, value){

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
            split: [
                {
                    walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
                    percentualValue: 10,
                },
                {
                    walletId:'736ce9af-da06-4908-9631-5425c2d73d88',
                    percentualValue: 10,
                },
            ]
        }

        const {data} = await axios.post(`${apiUrl}subscriptions`, assinatura, {headers})
        console.log('assinatura registrada com sucesso')
        
        return data

    } catch (error) {
        console.error(error)
        throw error
    }


}

async function criarNovaAssinaturaMericia(cpf, value){

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
            split: [
                {
                    walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
                    percentualValue: 15,
                },
                {
                    walletId:'80f9720e-bbea-4715-8135-6a817ad1a5f3',
                    percentualValue: 5,
                },
            ]
        }

        const {data} = await axios.post(`${apiUrl}subscriptions`, assinatura, {headers})
        console.log('assinatura registrada com sucesso')
        
        return data

    } catch (error) {
        console.error(error)
        throw error
    }


}

async function criarNovaAssinaturaJoyce(cpf, value){

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
            split: [
                {
                    walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
                    percentualValue: 15,
                },
                {
                    walletId:'33116e62-51cb-4c6f-97e7-ae8602602117',
                    percentualValue: 5,
                },
            ]
        }

        const {data} = await axios.post(`${apiUrl}subscriptions`, assinatura, {headers})
        console.log('assinatura registrada com sucesso')
        
        return data

    } catch (error) {
        console.error(error)
        throw error
    }


}


module.exports = { 
                    listarAssinaturas, 
                    criarNovaAssinatura, 
                    criarNovaAssinaturaJoyce,
                    criarNovaAssinaturaMericia,
                    criarNovaAssinaturaZenilson,
                }