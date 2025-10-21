# 📧 Backend Landing Page - Trilha Labs

Backend para recebimento de contatos da landing page da Trilha Labs via e-mail.

## 📁 Estrutura do Projeto

```
backend-lp-gehlen/
├── controllers/
│   └── sendMailController.js    # Lógica de envio de e-mails
├── templates/
│   └── contact-email.html       # Template HTML do e-mail
├── index.js                      # Servidor Express
├── package.json
└── .env                          # Configurações (criar manualmente)
```

## 🚀 Como Usar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Porta do servidor
DEFAULT_PORT=3000

# Origem permitida (CORS)
ALLOWED_ORIGIN=https://seu-site.com

# E-mail de envio (Gmail)
EMAIL=seu-email@gmail.com
PASSWORD=sua-senha-de-app

# Destinatários (separados por vírgula)
EMAIL_RECIPIENTS=contato1@trilhalabs.com,contato2@trilhalabs.com
```

> **Importante:** Use uma [senha de app do Gmail](https://support.google.com/accounts/answer/185833), não sua senha normal!

### 3. Iniciar o servidor

```bash
npm start
```

## 📮 Endpoint

**POST** `/`

Body (JSON):
```json
{
  "name": "Nome do Cliente",
  "mail": "cliente@example.com",
  "subject": "Assunto do contato",
  "message": "Mensagem do cliente...",
  "phone": "+55 11 99999-9999"
}
```

Resposta de sucesso:
```json
{
  "success": true,
  "message": "E-mail enviado com sucesso!"
}
```

## 🎨 Personalizar Template

O template HTML está em `templates/contact-email.html`. 

Para personalizar, edite esse arquivo diretamente. As variáveis disponíveis são:
- `{{SUBJECT}}` - Assunto
- `{{NAME}}` - Nome do cliente
- `{{EMAIL}}` - E-mail do cliente
- `{{PHONE}}` - Telefone
- `{{MESSAGE}}` - Mensagem
- `{{DATE_TIME}}` - Data e hora automáticas

## 📚 Documentação Completa

Veja o arquivo [CONFIGURACAO.md](./CONFIGURACAO.md) para mais detalhes sobre:
- Configuração de múltiplos destinatários
- Personalização de cores
- Exemplos de uso

## 🛠 Tecnologias

- Node.js + Express
- Nodemailer
- CORS
- Dotenv

