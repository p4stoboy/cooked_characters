import {Client, Events} from 'discord.js';
import {newchar} from "../commands/newchar";
import {Controller} from "../types/Controller";

const config = require('../config.json');

export const ready = {
  name: Events.ClientReady,
  once: true,
  execute: (c: Controller, client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setAvatar(config.avatar_url).catch((e) => console.log(e));
    client.user?.setUsername(config.username);
    client.application?.commands.set([newchar()]);
  },
}
