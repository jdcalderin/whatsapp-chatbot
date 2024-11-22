import { myPrompt } from './utils/prompt.js'; // Importar el prompt predefinido
import { googleAI, gemini15Flash, gemini15Pro } from '@genkit-ai/googleai';

const processWithAI = async (userMessage, ai, session) => {
    try {
        const filledPrompt = myPrompt;

        // Crear el chat usando la sesión proporcionada
        const chat = session.chat({
            model: gemini15Pro,
            system: filledPrompt,
            config: {
                temperature: 1.3,
            },
        });

        // Enviar el mensaje del usuario y esperar la respuesta
        const { text } = await chat.send(userMessage);

        // Persistir datos según la lógica del chatbot
        if (userMessage.toLowerCase().includes('soy de')) {
            const city = userMessage.split('soy de')[1]?.trim();
            if (city) {
                session.state.collectedData.city = city; // Actualizar el estado
                return `Gracias, ${session.state.userName || 'usuario'}. Hemos registrado que estás en ${city}. Un asesor te contactará pronto.`;
            }
        }

        // Responder con el texto generado por AI si no hay datos recolectados
        return text;
    } catch (error) {
        console.error('Error procesando el mensaje con Genkit:', error);
        return 'Lo siento, ocurrió un error al procesar tu mensaje.';
    }
};

export { processWithAI };
