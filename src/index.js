import dotenv from 'dotenv';
const result = dotenv.config({ path: './.env' });

import { createInterface } from "node:readline/promises";

import { genkit, z } from 'genkit';
import { googleAI, gemini15Flash } from '@genkit-ai/googleai';

import client from './services/whatsappClient.js';
import messageHandler from './handlers/messageHandler.js';

if (result.error) {
    console.error('Error cargando el archivo .env:', result.error);
    process.exit(1); // Detener la ejecución si no se carga el archivo
}

const ai = genkit({
    plugins: [googleAI()],
    model: gemini15Flash,
});




export const menuSuggestionFlow = ai.defineFlow(
    {
      name: 'menuSuggestionFlow',
    },
    async (restaurantTheme) => {
      const { text } = await ai.generate({
        model: gemini15Flash,
        prompt: `Invent a menu item for a ${restaurantTheme} themed restaurant.`,
      });
      return text;
    }
  );


// Conectar manejador de mensajes
// Conectar manejador de mensajes
client.on('message', (message) => messageHandler(message, ai)); // Pasa la instancia de AI


// Iniciar cliente de WhatsApp
client.initialize();
