import {ModalSubmitInteraction} from "discord.js";
import {create_char_command} from "../command_post_execute/create_char_command";
import {new_db_character} from "../../db/new_db_character";
import {Controller} from "../../types/Controller";


export const new_character = async (i: ModalSubmitInteraction, c: Controller): Promise<void> => {
    const f = i.fields;
    const name = f.getTextInputValue(`name`);
    const bio = f.getTextInputValue(`bio`);
    const creator_id = i.user.id;
    const image_url = f.getTextInputValue(`image_url`);
    const color = f.getTextInputValue(`color`);
    const char = await new_db_character(name, bio, creator_id, image_url, i.guildId as string, color);
    await create_char_command(i.client, i.guildId as string, char, c);
    await i.editReply({content: `**Character created: ${name}.**`});
}