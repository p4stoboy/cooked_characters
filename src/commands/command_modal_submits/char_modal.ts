import {CharacterProps} from "../../types/CharacterProps";
import {ActionRowBuilder, ModalBuilder, TextInputBuilder} from "discord.js";

export const get_char_modal = (char?: CharacterProps) => {

    const default_name = char ? char.name : "";
    const default_bio = char ? char.bio : "";
    const default_image_url = char ? char.image_url ? char.image_url : "" : "";
    const default_color = char ? char.color ? char.color : "#FF6600" : "#FF6600";
    const id = char ? char.id : "";
// create discord modal with fields for user to create new character
    const char_modal = new ModalBuilder().setTitle('New Character').setCustomId((char ? `editchar_${char.id}` : "new_char"));

    const name = new TextInputBuilder().setLabel("Character's name").setCustomId("name").setPlaceholder(default_name).setRequired(true).setStyle(1).setMaxLength(32);

    const bio = new TextInputBuilder().setLabel("Character's bio").setCustomId("bio").setPlaceholder(default_bio).setRequired(true).setMinLength(50).setMaxLength(2000).setStyle(2);

    const image_url= new TextInputBuilder().setLabel("Avatar URL (optional)").setCustomId("image_url").setPlaceholder(default_image_url).setRequired(false).setStyle(1);

    const color = new TextInputBuilder().setLabel("Hex color for embed").setCustomId("color").setPlaceholder(default_color).setRequired(false).setStyle(1).setMinLength(7).setMaxLength(7).setPlaceholder("#FF6600");

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(bio);
    const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(image_url);
    const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(color);

    char_modal.addComponents(row1, row2, row4, row3);

    return char_modal;
}