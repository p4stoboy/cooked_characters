
import {CharacterProps} from "../../types/CharacterProps";
import {get_prompt_response} from "../../utility_functions/get_prompt_response";
import {build_char_embed} from "../../utility_functions/build_char_embed";
import {update_edit_and_delete_commands} from "./update_edit_and_delete_commands";
import {Controller} from "../../types/Controller";
export const edit_char_command = async (c: Controller, guild_id: string, old_char: CharacterProps, new_char: CharacterProps) => {
    const command = {
        name: new_char.name.replaceAll(" ", "_").toLowerCase(),
        description: `Say something to ${new_char.name}`,
        options: [
            {
                name: "prompt",
                description: `tell them`,
                type: 3,
                required: true,
            }
        ],
        execute: async (interaction: any) => {
            const prompt = interaction.options.getString("prompt");
            const response = await get_prompt_response(prompt, new_char);
            await interaction.editReply({embeds: [build_char_embed(new_char, prompt, response)]});
        }
    };
    const guild = await c.client.guilds.fetch(guild_id);
    try {
        const old_command = guild.commands.cache.reduce((a,b) => b.name === old_char.name.replaceAll(" ", "_").toLowerCase() ? b : a);
        await guild.commands.delete(old_command);
        await guild.commands.create(command);
        await update_edit_and_delete_commands(guild_id, c);
        console.log(`Successfully edited application command ${new_char.name} -> ${old_char.name} in ${guild.name}.`);
    } catch(e) {
        console.log(e);
        console.error(`Error editing command ${old_char.name} in guild ${guild.name}, id: ${guild.id}`);
    }
}