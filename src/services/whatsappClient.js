import fs from 'fs';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

// Ruta de sesión
const sessionPath = process.env.SESSION_FILE_PATH || './session.json';

// Inicializar cliente con autenticación local
const client = new Client({
    authStrategy: new LocalAuth({
        dataPath: sessionPath
    })
});

// Generar QR al iniciar
client.on('qr', (qr) => {
    console.log('Scan the QR code below to log in:');
    qrcode.generate(qr, { small: true });
});

// Confirmación de cliente listo
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// Manejo de errores
client.on('auth_failure', () => {
    console.error('Authentication failed. Please restart the application.');
});

client.on('disconnected', () => {
    console.log('Client was logged out.');
    process.exit(1);
});

// Exportar el cliente para usar en otros módulos
export default client;
