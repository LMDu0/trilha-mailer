import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class SendMailController {
  constructor() {
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      });
    
    // Carrega o template HTML uma vez no construtor
    const templatePath = path.join(__dirname, '../templates/contact-email.html');
    this.emailTemplate = fs.readFileSync(templatePath, 'utf-8');
  }

  // Função para substituir as variáveis no template
  createEmailTemplate(data) {
    const { mail, subject, message, phone, name = 'Não informado' } = data;
    
    const dateTime = new Date().toLocaleString('pt-BR', { 
      timeZone: 'America/Sao_Paulo',
      dateStyle: 'full',
      timeStyle: 'short'
    });
    
    return this.emailTemplate
      .replace(/{{SUBJECT}}/g, subject)
      .replace(/{{NAME}}/g, name)
      .replace(/{{EMAIL}}/g, mail)
      .replace(/{{PHONE}}/g, phone)
      .replace(/{{MESSAGE}}/g, message.replace(/\n/g, '<br>'))
      .replace(/{{DATE_TIME}}/g, dateTime);
  }

  async sendMail(req, res) {
    try {
      const { mail, subject, message, phone, name } = req.body;
      
      // Pega múltiplos e-mails da variável de ambiente (separados por vírgula)
      const recipients = process.env.EMAIL_RECIPIENTS || process.env.EMAIL;
      
      // Cria o HTML personalizado
      const htmlContent = this.createEmailTemplate({ 
        mail, 
        subject, 
        message, 
        phone,
        name 
      });
      
      // Configurações do e-mail
      const mailOptions = {
        from: `"Landing Page - Novo Contato" <${process.env.EMAIL}>`,
        to: recipients, // Pode ser múltiplos e-mails separados por vírgula
        replyTo: mail, // Permite responder diretamente para o remetente
        subject: `🔔 ${subject}`,
        html: htmlContent,
        // Versão texto plano como fallback
        text: `
Nova mensagem recebida da Landing Page

Assunto: ${subject}
Nome: ${name || 'Não informado'}
E-mail: ${mail}
Telefone: ${phone}

Mensagem:
${message}

---
Data: ${new Date().toLocaleString('pt-BR')}
        `
      };
      
      await this.transporter.sendMail(mailOptions);
      console.log('E-mail enviado com sucesso!');
      res.status(200).json({ 
        success: true,
        message: 'E-mail enviado com sucesso!' 
      });
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      res.status(400).json({ 
        success: false,
        message: 'Erro ao enviar e-mail',
        error: error.message 
      });
    }
  }
}