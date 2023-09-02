import {Events, Interaction} from 'discord.js';
import char_modal from "../commands/newchar";
import {new_character} from "../db/new_character";
import {get_commands} from "../commands";

export const InteractionCreate = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand() && !interaction.isModalSubmit()) return;

    if (interaction.isChatInputCommand()) {
      if (interaction.commandName === `newchar`) {
        await interaction.showModal(char_modal)
        return;
      }
      const {commands} = await get_commands(interaction.guildId as string);
      const command = commands.get(interaction.commandName);

      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }

      try {
        //@ts-ignore
        await command.execute(interaction);
      } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
      }
    } else {
        await new_character(interaction);
    }
  },
};
