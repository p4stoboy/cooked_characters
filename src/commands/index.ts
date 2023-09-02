import {ApplicationCommandData, ChatInputApplicationCommandData} from "discord.js";
import {build_char_commands} from "./build_char_commands";
import {new_character} from "../db/new_character";

export const get_commands = async (guild_id: string) => {
    const command_objects = await build_char_commands(guild_id);
    const commands_array: ApplicationCommandData[] = [];
    const commands = new Map<string, ApplicationCommandData>();
    for (let command of command_objects) {
        commands_array.push(command);
        commands.set(command.name, command);
    }
    return {commands_array, commands};
}

