// import {ApplicationCommandData, Client} from "discord.js";
// import {build_char_commands} from "./build_char_commands";
// import {build_admin_commands} from "./build_admin_commands";
//
//
//
// export const get_guild_commands = async (guild_id: string) => {
//     const char_command_objects = await build_char_commands(guild_id);
//     const admin_command_objects = await build_admin_commands(guild_id);
//     const commands_array: ApplicationCommandData[] = [];
//     const commands = new Map<string, ApplicationCommandData>();
//     for (let command of char_command_objects) {
//         commands_array.push(command);
//         commands.set(command.name, command);
//     }
//     for (let command of admin_command_objects) {
//         commands_array.push(command);
//         commands.set(command.name, command);
//     }
//     return {commands_array, commands};
// }


