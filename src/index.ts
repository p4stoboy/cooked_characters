import {Client, ClientEvents, Events, GatewayIntentBits} from 'discord.js';
import { events } from './events/index';
const config = require('./config.json');



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


for (const event of events) {
    if (event.once) {
        //@ts-ignore
        client.once(event.name as keyof ClientEvents, (...args) => event.execute(...args));
    } else {
        //@ts-ignore
        client.on(event.name as keyof ClientEvents, (...args) => event.execute(...args));
    }
}
//
// Log in to Discord with your client's token
client.login(config.token);