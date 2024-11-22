import { processWithAI } from '../aiService.js'; // Importar la función de procesamiento AI

// Objeto para almacenar sesiones de usuarios
const sessions = {};

const handleMessage = async (message, ai) => {
    console.log(`Message received: ${message.body}`);

    const allowedPhoneNumber = '573013677096'; // Número permitido
    const userPhone = message.from;

    // Verificar si el mensaje proviene del número permitido
    if (userPhone.startsWith(allowedPhoneNumber)) {
        console.log(`Message received from allowed number: ${message.body}`);

        // Obtener sesión existente o crear una nueva
        if (!sessions[userPhone]) {
            sessions[userPhone] = ai.createSession({
                initialState: {
                    userName: '', // Puedes ajustar esto con el nombre del usuario si lo obtienes
                    collectedData: {},
                },
            });
        }

        const session = sessions[userPhone]; // Obtener la sesión del usuario

        // Procesar el mensaje con la sesión específica del usuario
        const userMessage = message.body.replace('genkit:', '').trim(); // Remover el prefijo 'genkit:'
        const aiResponse = await processWithAI(userMessage, ai, session); // Pasar la sesión al procesador
        message.reply(aiResponse); // Responder al usuario con el mensaje procesado

    } else {
        console.log(`Message from unauthorized number: ${userPhone}. Ignored.`);
        // No responder a números no autorizados
    }
};

export default handleMessage;
