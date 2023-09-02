import {ApplicationCommandData, ChatInputApplicationCommandData} from "discord.js";
import {build_char_commands} from "./build_char_commands";
import {new_character} from "../db/new_character";

const new_char_command: ChatInputApplicationCommandData = {
    name: "newchar",
    description: "Create a new character",
    options: []
};

export const get_commands = async (guild_id: string) => {
    const command_objects = await build_char_commands(guild_id);
    const commands_array: ApplicationCommandData[] = [];
    const commands = new Map<string, ApplicationCommandData>();
    for (let command of command_objects) {
        commands_array.push(command);
        commands.set(command.name, command);
    }
    commands_array.push(new_char_command);
    commands.set(new_char_command.name, new_char_command);
    return {commands_array, commands};
}

