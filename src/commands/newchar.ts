import {get_char_modal} from "./command_modal_submits/char_modal";


export const newchar = () => {
    const command =       {
        name: "newchar",
        description: "Create a new character",
        options: [],
        execute: async (interaction: any) => {
            await interaction.showModal(get_char_modal());
            return;
        }
    }
    return command;
}