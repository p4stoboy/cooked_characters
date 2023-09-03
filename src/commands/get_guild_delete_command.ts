import {get_guild_chars} from "../db/get_guild_chars";
import {get_char_by_id} from "../db/get_char_by_id";
import {delete_db_character} from "../db/delete_char_by_id";
import {update_guild_commands} from "./command_post_execute/update_guild_commands";
import {Controller} from "../types/Controller";

export const get_guild_delete_command = async (guild_id: string) => {
    const chars = await get_guild_chars(guild_id);
    // if (chars.length === 0) return {
    //     name: "deletechar",
    //     description: "This guild has no characters, create one with /newchar",
    //     options: [],
    //     execute: async (interaction: any) => {
    //         await interaction.reply("This guild has no characters, create one with /newchar");
    //         return;
    //     }
    // }
    const name = chars.map(char => char.name.toLowerCase().replaceAll(" ", "_"));
    const _delete = {
        name: "deletechar",
        description: "Delete a character",
        options: [{
            name: "character",
            description: "The character to delete.",
            type: 4,
            required: true,
            choices: name.map((name, index) => {
                return {name, value: chars[index].id};
            })
        }],
    }
    return _delete;
}

export const delete_execute = async (interaction: any, guild_id: string, c: Controller) => {
    try {
        const char_id = interaction.options.getInteger("character");
        const char = await get_char_by_id(char_id);
        if (interaction.user.id !== char.creator_id) {
            await interaction.reply(`**You are not the creator of ${char.name}**`);
            return;
        }
        interaction.deferReply();
        await delete_db_character(char_id);
        await update_guild_commands(guild_id, c);
        interaction.editReply(`**${char.name} deleted.**`);
        return;
    } catch(e) {
        console.log(e);
        await interaction.editReply("An error occurred.");
    }
}
