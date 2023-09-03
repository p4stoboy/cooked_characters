import {Client, Events} from 'discord.js';
const config = require('../config.json');
import {newchar} from "../commands/newchar";
import {editchar} from "../commands/editchar";
import {deletechar} from "../commands/deletechar";
import {Controller} from "../types/Controller";

export const ready = {
  name: Events.ClientReady,
  once: true,
  execute: (controller: Controller, client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setAvatar(config.avatar_url).catch((e) => console.log(e));
    client.user?.setUsername(config.username);
    client.application?.commands.set([newchar()]);
    client.guilds.cache.forEach(async (guild) => {
      try {
        if (!guild.commands.cache.find((command) => command.name === 'editchar')) {
          const edit_command = await editchar(guild.id);
          await guild.commands.create(edit_command);
        }
        if (!guild.commands.cache.find((command) => command.name === 'deletechar')) {
          const delete_command = await deletechar(guild.id);
          await guild.commands.create(delete_command);
        }
      } catch(e) {
        console.log(e);
        console.error(`Error registering edit/delete in guild ${guild.name}, id: ${guild.id}`);
      }
    });
  },
}
