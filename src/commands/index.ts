import {ApplicationCommandData} from "discord.js";
import {get_guild_edit_command} from "./get_guild_edit_command";
import {get_guild_say_command} from "./get_guild_say_command";
import {get_guild_delete_command} from "./get_guild_delete_command";


const command_func_map = new Map<string, (guild_id: string) => Promise<ApplicationCommandData>>
command_func_map.set(`editchar`, get_guild_edit_command);
command_func_map.set(`deletechar`, get_guild_delete_command);
command_func_map.set(`say`, get_guild_say_command);

export default command_func_map;