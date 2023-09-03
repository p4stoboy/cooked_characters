import {get_guild_chars} from "../db/get_guild_chars";
import {get_char_by_id} from "../db/get_char_by_id";
import {delete_db_character} from "../db/delete_char_by_id";
import {update_edit_and_delete_commands} from "./command_post_execute/update_edit_and_delete_commands";

export const get_guild_delete_command = async (guild_id: string) => {
    const chars = await get_guild_chars(guild_id);
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
        execute: async (interaction: any) => {
            try {
                const char_id = interaction.options.getInteger("character");
                const char = await get_char_by_id(char_id);
                if (interaction.user.id !== char.creator_id) {
                    await interaction.reply(`**You are not the creator of ${char.name}**`);
                    return;
                }
                await delete_db_character(char_id);
                await update_edit_and_delete_commands(guild_id, interaction.client);
                interaction.reply(`**${char.name} deleted.**`);
                return;
            } catch(e) {
                console.log(e);
                await interaction.reply("An error occurred.");
            }
        }
    }
    return _delete;
}
