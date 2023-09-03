import {get_guild_chars} from "../db/get_guild_chars";
import {get_char_by_id} from "../db/get_char_by_id";
import {Controller} from "../types/Controller";

export const get_guild_bio_command = async (guild_id: string) => {
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
        name: "bio",
        description: "Get a character's bio dm'd to you.",
        options: [{
            name: "character",
            description: "The character bio.",
            type: 4,
            required: true,
            choices: name.map((name, index) => {
                return {name, value: chars[index].id};
            })
        }],
    }
    return _delete;
}

export const bio_execute = async (interaction: any, guild_id: string, c: Controller) => {
    try {
        const char_id = interaction.options.getInteger("character");
        const char = await get_char_by_id(char_id);
        interaction.user.send(`**${char.name} bio:**\n${char.bio}`);
        interaction.reply(`**${char.name} bio sent to your dms.**`, {ephemeral: true});
        return;
    } catch(e) {
        console.log(e);
        await interaction.reply("An error occurred.");
    }
}
