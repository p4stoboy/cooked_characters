import {get_guild_chars} from "../db/get_guild_chars";
import {get_char_by_id} from "../db/get_char_by_id";
import {get_char_modal} from "./command_modal_submits/char_modal";
import {Controller} from "../types/Controller";



export const get_guild_edit_command = async (guild_id: string) => {
    const chars = await get_guild_chars(guild_id);
    // if (chars.length === 0) return {
    //     name: "editchar",
    //     description: "This guild has no characters, create one with /newchar",
    //     options: [],
    //     execute: async (interaction: any) => {
    //         await interaction.reply("This guild has no characters, create one with /newchar");
    //         return;
    //     }
    // }
    const name = chars.map(char => char.name.toLowerCase().replaceAll(" ", "_"));
    const edit = {
        name: "editchar",
        description: "Edit a character's information.",
        options: [{
            name: "character",
            description: "The character to edit.",
            type: 4,
            required: true,
            choices: name.map((name, index) => {
                return {name, value: chars[index].id};
            })
        }],
    }
    return edit;
}

export const edit_execute = async (interaction: any, guild_id: string, c: Controller) => {
    try {
        const char_id = interaction.options.getInteger("character");
        const char = await get_char_by_id(char_id);
        if (interaction.user.id !== char.creator_id) {
            await interaction.reply(`**You are not the creator of ${char.name}**`);
            return;
        }
        const modal = get_char_modal(char);
        await interaction.showModal(modal);
        return;
    } catch(e) {
        console.log(e);
        await interaction.reply("An error occurred.");
    }
}