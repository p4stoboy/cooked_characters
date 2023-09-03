import {Events, Guild} from "discord.js";


export const GuildCreate = {
  name: Events.GuildCreate,
  once: false,
  execute: async (guild: Guild) => {
    try {
      // await register_commands(guild.client, guild.id);
      // console.log(`Successfully registered application commands in ${guild.name}.`);
    } catch(e) {
      console.log(e);
      console.error(`Error registering commands in guild ${guild.name}, id: ${guild.id}`);
    }
  },
}
