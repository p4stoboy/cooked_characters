import {Events, Interaction} from 'discord.js';
import {get_char_modal} from "../commands/command_modal_submits/char_modal";
import {new_character_modal_submit} from "../commands/command_modal_submits/new_char_modal_submit";
import {edit_character_modal_submit} from "../commands/command_modal_submits/edit_character_modal_submit";
import {Controller} from "../types/Controller";
import client_commands from "../commands/client_commands";

export const InteractionCreate = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (controller: Controller, interaction: Interaction) => {
    if (!interaction.isChatInputCommand() && !interaction.isModalSubmit()) return;

    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === `newchar`) {
        await interaction.showModal(get_char_modal())
        return;
      }
      let command = client_commands.get(interaction.commandName);
      if (!command) {
        console.log(`Command ${interaction.commandName} not found`);
        return;
      }

      try {
        //@ts-ignore
        await command(interaction, interaction.guildId, controller);
        return;
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else {
        if (interaction.customId === `new_char`) {
          await new_character_modal_submit(interaction, controller);
          return;
        } else {
          await edit_character_modal_submit(interaction, controller);
          return;
        }
    }
  },
};
