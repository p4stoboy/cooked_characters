import {ApplicationCommand, ApplicationCommandData, Client, ClientEvents, Events, GatewayIntentBits} from 'discord.js';
import { events } from './events/index';
import {Controller} from "./types/Controller";
const config = require('./config.json');



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const controller: Controller = {
    client: client,
    commands: new Map<string, Map<string, ApplicationCommandData>>()
}



for (const event of events) {
    if (event.once) {
        //@ts-ignore
        client.once(event.name as keyof ClientEvents, (...args) => event.execute(controller, ...args));
    } else {
        //@ts-ignore
        client.on(event.name as keyof ClientEvents, (...args) => event.execute(controller, ...args));
    }
}
//
// Log in to Discord with your client's token
client.login(config.token);