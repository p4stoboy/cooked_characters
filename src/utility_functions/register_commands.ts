// import {Client} from "discord.js";
// import {get_commands} from "../commands";
//
//
// export const register_commands = async (client: Client, guild_id: string) => {
//     const {commands_array} = await get_commands(guild_id);
//     const guild = await client.guilds.fetch(guild_id);
//     try {
//         await guild.commands.set(commands_array);
//         console.log(`Successfully registered application commands in ${guild.name}.`);
//     } catch(e) {
//         console.log(e);
//         console.error(`Error registering commands in guild ${guild.name}, id: ${guild.id}`);
//     }
// }