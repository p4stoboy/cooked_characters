import {get_guild_chars} from "../db/get_guild_chars";
import {get_char_by_id} from "../db/get_char_by_id";
import {get_char_modal} from "./command_modal_submits/char_modal";



export const editchar = async (guild_id: string) => {
    const chars = await get_guild_chars(guild_id);
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
        execute: async (interaction: any) => {
            try {
                interaction.deferReply();
                const char_id = interaction.options.getInteger("character");
                const char = await get_char_by_id(char_id);
                if (interaction.user.id !== char.creator_id) {
                    await interaction.editReply(`**You are not the creator of ${char.name}**`);
                    return;
                }
                const modal = get_char_modal(char);
                await interaction.showModal(modal);
                return;
            } catch(e) {
                console.log(e);
                await interaction.editReply("An error occurred.");
            }
        }
    }
    return edit;
}
