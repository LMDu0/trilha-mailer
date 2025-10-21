import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import SendMailController from './controllers/sendMailController.js';
dotenv.config();
const app = express();
app.use(express.json())

// Configuração de CORS para aceitar múltiplas origens e domínios com wildcard
const allowedOrigins = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim())
    : [];

var corsOptions = {
    origin: function (origin, callback) {
        // Permite requisições sem origin (como Postman, curl, etc)
        if (!origin) {
            return callback(null, true);
        }

        // Verifica se a origem está na lista exata
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        // Verifica se a origem contém algum dos domínios permitidos
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            // Se for um domínio sem protocolo, verifica se está contido na origin
            if (!allowedOrigin.startsWith('http')) {
                return origin.includes(allowedOrigin);
            }
            // Se for URL completa, compara exata
            return origin === allowedOrigin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Origem não permitida pelo CORS'));
        }
    },
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));
const sendMailController = new SendMailController();

app.post('/', (req, res) => {
    sendMailController.sendMail(req, res);
});

app.listen(process.env.DEFAULT_PORT, () => {
    console.log(`App listening at http://localhost:${process.env.DEFAULT_PORT}`);
});