import {ApplicationCommand, Events, Interaction} from 'discord.js';
import {get_char_modal} from "../commands/command_modal_submits/char_modal";
import {new_character} from "../commands/command_modal_submits/new_char";
import {edit_character} from "../commands/command_modal_submits/edit_char";

export const InteractionCreate = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand() && !interaction.isModalSubmit()) return;

    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === `newchar`) {
        await interaction.showModal(get_char_modal())
        return;
      }
      const command: ApplicationCommand | undefined = interaction.guild?.commands.cache.reduce((acc, command): ApplicationCommand => { return command.name === interaction.commandName ? command : acc });
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        await interaction.deferReply();
        //@ts-ignore
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else {
        if (interaction.customId === `new_char`) {
          await new_character(interaction);
          return;
        } else {
          await edit_character(interaction);
          return;
        }
    }
  },
};
