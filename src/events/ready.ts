import {ApplicationCommandData, Client, Events} from 'discord.js';
const config = require('../config.json');
import {newchar} from "../commands/newchar";
import {get_guild_edit_command} from "../commands/get_guild_edit_command";
import {get_guild_delete_command} from "../commands/get_guild_delete_command";
import {Controller} from "../types/Controller";
import {build_char_commands} from "../commands/build_char_commands";
import {update_guild_commands} from "../commands/command_post_execute/update_guild_commands";

export const ready = {
  name: Events.ClientReady,
  once: true,
  execute: (c: Controller, client: Client) => {
    console.log(`Ready! Logged in as ${client.user?.tag}`);
    client.user?.setAvatar(config.avatar_url).catch((e) => console.log(e));
    client.user?.setUsername(config.username);
    client.application?.commands.set([newchar()]);
    client.guilds.cache.forEach(async (guild) => {
      await update_guild_commands(guild.id, c);
    });
  },
}
