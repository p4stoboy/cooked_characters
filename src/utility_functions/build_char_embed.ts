import {CharacterProps} from "../types/CharacterProps";
import {ColorResolvable, EmbedBuilder} from "discord.js";

export const build_char_embed = (char: CharacterProps, prompt: string, response: string) => {
    const embed = new EmbedBuilder()
        .setTitle(char.name)
        .addFields([
            {name: "You said:", value: prompt},
            {name: `${char.name} said:`, value: response}

        ])
        .setColor((char.color ? char.color as ColorResolvable : "#FF3300"))
    if (char.image_url) {
        embed.setThumbnail(char.image_url);
    }
    return embed;
}