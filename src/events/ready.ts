import {ChatInputApplicationCommandData, Client, Events} from 'discord.js';
const config = require('../config.json');
import {register_commands} from "../commands/register_commands";

export const ready = {
  name: Events.ClientReady,
  once: true,
  execute: (client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setAvatar(config.avatar_url).catch((e) => console.log(e));
    client.user?.setUsername(config.username);
    client.application?.commands.set([
      {
        name: "newchar",
        description: "Create a new character",
        options: []
      }
    ]);
    // client.guilds.cache.forEach(async (guild) => {
    //   try {
    //     await register_commands(client, guild.id);
    //     console.log(`Successfully registered application commands in ${guild.name}.`);
    //   } catch(e) {
    //     console.log(e);
    //     console.error(`Error registering commands in guild ${guild.name}, id: ${guild.id}`);
    //   }
    // });
  },
}
