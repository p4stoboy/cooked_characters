import {ApplicationCommandData, Client, Events} from 'discord.js';
const config = require('../config.json');
import {newchar} from "../commands/newchar";
import {editchar} from "../commands/editchar";
import {deletechar} from "../commands/deletechar";
import {Controller} from "../types/Controller";
import {build_char_commands} from "../commands/build_char_commands";

export const ready = {
  name: Events.ClientReady,
  once: true,
  execute: (c: Controller, client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setAvatar(config.avatar_url).catch((e) => console.log(e));
    client.user?.setUsername(config.username);
    client.application?.commands.set([newchar()]);
    client.guilds.cache.forEach(async (guild) => {
      const char_commands = await build_char_commands(guild.id);
      const edit_command = await editchar(guild.id);
      const delete_command = await deletechar(guild.id);
      c.commands.set(guild.id, new Map<string, ApplicationCommandData>);
        char_commands.forEach((command) => {
        c.commands.get(guild.id)?.set(command.name, command);
      });
      c.commands.get(guild.id)?.set(edit_command.name, edit_command);
      c.commands.get(guild.id)?.set(delete_command.name, delete_command);
      try {
        if (!guild.commands.cache.find((command) => command.name === 'editchar')) {
          const edit_command = await editchar(guild.id);
          await guild.commands.create(edit_command);
          console.log(`Successfully registered edit command in ${guild.name}.`)
        }
        if (!guild.commands.cache.find((command) => command.name === 'deletechar')) {
          const delete_command = await deletechar(guild.id);
          await guild.commands.create(delete_command);
          console.log(`Successfully registered delete command in ${guild.name}.`)
        }
      } catch(e) {
        console.log(e);
        console.error(`Error registering edit/delete in guild ${guild.name}, id: ${guild.id}`);
      }
    });
  },
}
