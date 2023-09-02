import {get_guild_chars} from "../db/get_guild_chars";
import {build_char_embed} from "../utility_functions/build_char_embed";
import {get_prompt_response} from "./get_prompt_response";


export const build_char_commands = async (guild_id: string) => {
    const chars = await get_guild_chars(guild_id);
    if (chars.length === 0) return [];
    const res = [];
    for (let char of chars) {
        res.push({
            name: char.name.replace(" ", "_").toLowerCase(),
            description: `Say something to ${char.name}`,
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
                const response = await get_prompt_response(prompt, char);
                await interaction.editReply({embeds: [build_char_embed(char, prompt, response)]});
            }
        })
    }
    return res;
}