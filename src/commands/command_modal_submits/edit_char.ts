import {ModalSubmitInteraction} from "discord.js";
import {new_db_character} from "../../db/new_db_character";
import {edit_char_command} from "../command_post_execute/edit_char_command";
import {get_char_by_id} from "../../db/get_char_by_id";


export const edit_character = async (i: ModalSubmitInteraction): Promise<void> => {
    const f = i.fields;
    const id = i.customId.split("_")[1];
    const name = f.getTextInputValue(`name`);
    const bio = f.getTextInputValue(`bio`);
    const creator_id = i.user.id;
    const image_url = f.getTextInputValue(`image_url`);
    const color = f.getTextInputValue(`color`);
    const old_char = await get_char_by_id(parseInt(id));
    const char = await new_db_character(name, bio, creator_id, image_url, i.guildId as string, color);
    await edit_char_command(i.client, i.guildId as string, old_char, char);
    await i.editReply({content: `**Character edited: ${name}.**`});
}