import {get_prompt_response} from "./get_prompt_response";
import {build_char_embed} from "../utility_functions/build_char_embed";
import {Client} from "discord.js";
import {CharacterProps} from "../types/CharacterProps";

export const add_char_command = async (client: Client, guild_id: string, char: CharacterProps) => {
    const command = {
        name: char.name.replaceAll(" ", "_").toLowerCase(),
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
    };
    const guild = await client.guilds.fetch(guild_id);
    try {
        await guild.commands.create(command);
        console.log(`Successfully registered application command ${command.name} in ${guild.name}.`);
    } catch(e) {
        console.log(e);
        console.error(`Error registering command ${command.name} in guild ${guild.name}, id: ${guild.id}`);
    }
}