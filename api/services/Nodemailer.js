const nodemailer = require('nodemailer')
const math = require('math')
const xlsx = require('xlsx')
const { listarClientesTelemedicina } = require('./clientesTelemedicina')

const transporter = nodemailer.createTransport({
    host:'email-ssl.com.br',
    port: 465,
    secure: true,

    auth:{
        user: 'desenvolvimento@hbcard.com.br',
        pass: '24092004Vi.'
    },

    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
})

async function enviarEmail(){

    const mailOptions = {
        from: 'desenvolvimento@hbcard.com.br', // Substitua com seu e-mail na Locaweb
        to: 'lais.cerise@gmail.com',
        subject: 'oi laís!',
        text: 'oi laís!',
      }

      console.log('enviando email...')

      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.messageId);
        return info;
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error;
      }
}

function obterDia10DoProximoMes() {

    const hoje = new Date();
    // console.log(hoje)

    hoje.setDate(1)
    hoje.setMonth(hoje.getMonth() + 1)  
    hoje.setDate(10)

    // console.log(hoje)

    return hoje;

  }


async function enviarEmailPosCompra(email, nome){

    const deadline = obterDia10DoProximoMes()
    const hoje = new Date()

    const prazo = Math.ceil((deadline - hoje) / (1000 * 60 * 60 * 24))

    const mailOptions = {
        from: 'desenvolvimento@hbcard.com.br', // Substitua com seu e-mail na Locaweb
        to: email,
        subject: 'BEM VINDO AO MUNDO HBCARD',
        text: `olá ${nome}, seja bem vindo(a) ao mundo hbcard! em ${prazo} dias você poderá acessar sua telemedicina hbcard, aguarde novos emails para mais notícias ou fale com a gente https://wa.me/+5582999353701`,
      }

      console.log('enviando email...')
 
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado:', info.messageId);
        return info;
      } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        throw error;
      }

}

function criarPlanilhaUsuarios(dados) {
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(dados);
  
    // Adicione a folha de dados ao livro
    xlsx.utils.book_append_sheet(wb, ws, 'Usuários');
  
    // Crie um buffer com os dados da planilha
    const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
  
    return buffer;
  }


  async function enviarPlanilhaUsuarios() {
    try {
      const dadosUsuarios = await listarClientesTelemedicina();
      const bufferPlanilha = criarPlanilhaUsuarios(dadosUsuarios);
  
      const mailOptions = {
        from: 'desenvolvimento@hbcard.com.br',
        to: 'financeiro@hbcard.com.br',
        subject: 'Planilha de Clientes TELEMEDICINA HBCARD',
        text: `em anexo está a planilha de clientes.`,
        attachments: [
          {
            filename: 'usuarios.xlsx',
            content: bufferPlanilha,
          },
        ],
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail enviado:', info.messageId);
      return info;
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw error;
    }
  }

module.exports = {enviarEmail, enviarEmailPosCompra, enviarPlanilhaUsuarios}