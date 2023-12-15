const headers = require('../model/headers')
const axios = require('axios');
const { getCodigoCliente } = require('./clienteAsaas');
const { format, addDays } = require('date-fns');


async function criarCobrancaAsaas(costumer_code, value){

    console.log(costumer_code, value)

    try {
        
        const data = getData()
        const body = {
            billingType: "UNDEFINED",
            customer: costumer_code,
            value: value,
            dueDate: data
        }

        const response = await axios.post('https://sandbox.asaas.com/api/v3/payments', body, { headers })
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
        const {data} = await axios.get(`https://sandbox.asaas.com/api/v3/payments?customer=${costumer_code}`, { headers })
        console.log(data)
        return data
    } catch (error) {
        console.error('erro ao recuperar cobrança: ,' , error)
        throw error
    }
}


module.exports = { criarCobrancaAsaas, getLinkCobranca };