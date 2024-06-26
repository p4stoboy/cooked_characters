import {get_guild_chars} from "../db/get_guild_chars";
import {get_prompt_response} from "../utility_functions/get_prompt_response";
import {build_char_embed} from "../utility_functions/build_char_embed";
import {Controller} from "../types/Controller";


export const get_guild_say_command = async (guild_id: string) => {
    const chars = await get_guild_chars(guild_id);
    const names = chars.map(char => char.name.replaceAll(" ", "_").toLowerCase());
    return {
        name: "say",
        description: "Say something to a character",
        options: [{
                name: "character",
                description: "The character to speak to.",
                type: 4,
                required: true,
                choices: names.map((name, index) => {
                return {name, value: chars[index].id};
            })},
            {
                name: "prompt",
                description: `tell them`,
                type: 3,
                required: true,
            }],
    }
}

export const say_execute = async (interaction: any, guild_id: string, c: Controller) => {
    const chars = await get_guild_chars(guild_id);
    try {
        await interaction.deferReply();
        const char_id = interaction.options.getInteger("character");
        const char = chars.find(char => char.id === char_id);
        if (!char) {
            await interaction.editReply("An error occurred.");
            return;
        }
        const prompt = interaction.options.getString("prompt");
        const response = await get_prompt_response(prompt, char);
        await interaction.editReply({embeds: [build_char_embed(char, prompt, response)]});
    } catch(e) {
        console.log(e);
        await interaction.editReply("An error occurred.");
    }
}