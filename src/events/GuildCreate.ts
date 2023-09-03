import {Events, Guild} from "discord.js";
import {Controller} from "../types/Controller";
import {update_guild_commands} from "../commands/command_post_execute/update_guild_commands";


export const GuildCreate = {
  name: Events.GuildCreate,
  once: false,
  execute: async (c: Controller, guild: Guild) => {
    try {
      await update_guild_commands(guild.id, c, true);
      console.log(`Successfully registered application commands in ${guild.name}.`);
    } catch(e) {
      console.log(e);
      console.error(`Error registering commands in guild ${guild.name}, id: ${guild.id}`);
    }
  },
}
