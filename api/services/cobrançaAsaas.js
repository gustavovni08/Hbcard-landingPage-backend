const {apiUrl, headers} = require('../model/headers')
const axios = require('axios');
const { getCodigoCliente } = require('./clienteAsaas');
const { format, addDays } = require('date-fns');


async function criarCobrancaAsaas(costumer_code, value, vendor_code){

    console.log(costumer_code, value, vendor_code)

    try {
        
        const data = getData()
        const body = {
            billingType: "UNDEFINED",
            customer: costumer_code,
            value: value,
            dueDate: data,
            description:`PLANO TELEMEDICINA HBCARD 1° MENSALIDADE + TAXA DE ADESÃO || VENDEDOR:${vendor_code}`,

            // split: [{
            //     walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
            //     percentualValue: 100,
            // }],
        }

        const response = await axios.post(`${apiUrl}payments`, body, { headers })
        console.log('Cobrança criada com sucesso:', response.data);
        return response.data;

    } catch (error) {
        
        console.error('Erro ao criar cobrança:', error);
        throw error;

    }

}

async function criarCobrancaAsaasZenilson(costumer_code, value){

    console.log(costumer_code, value)

    try {
        
        const data = getData()
        const body = {
            billingType: "UNDEFINED",
            customer: costumer_code,
            value: value,
            dueDate: data,
            description:'PLANO TELEMEDICINA HBCARD 1° MENSALIDADE + TAXA DE ADESÃO',

            split: [
                {
                    walletId:'736ce9af-da06-4908-9631-5425c2d73d88',
                    percentualValue: 50,
                },
                {
                    walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
                    percentualValue: 50,
                },
        ],
        }

        const response = await axios.post(`${apiUrl}payments`, body, { headers })
        console.log('Cobrança criada com sucesso:', response.data);
        return response.data;

    } catch (error) {
        
        console.error('Erro ao criar cobrança:', error);
        throw error;

    }

}

async function criarCobrancaAsaasMericia(costumer_code, value){

    console.log(costumer_code, value)

    try {
        
        const data = getData()
        const body = {
            billingType: "UNDEFINED",
            customer: costumer_code,
            value: value,
            dueDate: data,
            description:'PLANO TELEMEDICINA HBCARD 1° MENSALIDADE + TAXA DE ADESÃO',

            split: [
                {
                    walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
                    percentualValue: 50,
                },
                {
                    walletId:'736ce9af-da06-4908-9631-5425c2d73d88',
                    percentualValue: 50,
                },
        ],
        }

        const response = await axios.post(`${apiUrl}payments`, body, { headers })
        console.log('Cobrança criada com sucesso:', response.data);
        return response.data;

    } catch (error) {
        
        console.error('Erro ao criar cobrança:', error);
        throw error;

    }

}

async function criarCobrancaAsaasJoyce(costumer_code, value){

    console.log(costumer_code, value)

    try {
        
        const data = getData()
        const body = {
            billingType: "UNDEFINED",
            customer: costumer_code,
            value: value,
            dueDate: data,
            description:'PLANO TELEMEDICINA HBCARD 1° MENSALIDADE + TAXA DE ADESÃO',

            split: [
                {
                    walletId:'502f7e79-b3ae-4dc6-bb0d-f2cb86c7bdf4',
                    percentualValue: 50,
                },
                {
                    walletId:'33116e62-51cb-4c6f-97e7-ae8602602117',
                    percentualValue: 50,
                },
        ],
        }

        const response = await axios.post(`${apiUrl}payments`, body, { headers })
        console.log('Cobrança criada com sucesso:', response.data);
        return response.data;

    } catch (error) {
        
        console.error('Erro ao criar cobrança:', error);
        throw error;

    }

}


function getData() {

    const dataAtual = new Date();
    const dataMaisTresDias = addDays(dataAtual, 3);
    const dataFormatada = format(dataMaisTresDias, 'yyyy-MM-dd');

    return dataFormatada;
}


async function getLinkCobranca(cpf){
    try{
        const costumer_code = await getCodigoCliente(cpf)
        const {data} = await axios.get(`${apiUrl}payments?customer=${costumer_code}`, { headers })
        console.log(data)
        return data
    } catch (error) {
        console.error('erro ao recuperar cobrança: ,' , error)
        throw error
    }
}


module.exports = {  
                    getLinkCobranca, 
                    criarCobrancaAsaas,
                    criarCobrancaAsaasJoyce, 
                    criarCobrancaAsaasMericia, 
                    criarCobrancaAsaasZenilson, 
}