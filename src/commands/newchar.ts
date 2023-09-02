import {ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";

// create discord modal with fields for user to create new character
const char_modal = new ModalBuilder().setTitle('New Character').setCustomId("newchar");

const name = new TextInputBuilder().setLabel("Character's name").setCustomId("name").setRequired(true).setStyle(1).setMaxLength(32);

const bio = new TextInputBuilder().setLabel("Character's bio").setCustomId("bio").setRequired(true).setMinLength(50).setMaxLength(2000).setStyle(2);

const image_url= new TextInputBuilder().setLabel("Avatar URL (optional)").setCustomId("image_url").setRequired(false).setStyle(1);

const color = new TextInputBuilder().setLabel("Hex color for embed").setCustomId("color").setRequired(false).setStyle(1).setMinLength(7).setMaxLength(7).setPlaceholder("#FF6600");

const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(name);
const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(bio);
const row3 = new ActionRowBuilder<TextInputBuilder>().addComponents(image_url);
const row4 = new ActionRowBuilder<TextInputBuilder>().addComponents(color);

char_modal.addComponents(row1, row2, row4, row3);

export default char_modal;