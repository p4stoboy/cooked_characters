import {ModalSubmitInteraction} from "discord.js";
import {Controller} from "../../types/Controller";
import {edit_db_character} from "../../db/edit_db_character";
import {post_modal_execute} from "../command_post_execute/post_modal_execute";


export const edit_character_modal_submit = async (i: ModalSubmitInteraction, c: Controller): Promise<void> => {
    await i.deferReply();
    const f = i.fields;
    const id = i.customId.split("_")[1];
    const name = f.getTextInputValue(`name`);
    const bio = f.getTextInputValue(`bio`);
    const creator_id = i.user.id;
    const image_url = f.getTextInputValue(`image_url`);
    const color = f.getTextInputValue(`color`);
    await edit_db_character(parseInt(id), name, bio, image_url, color);
    await post_modal_execute(i.guildId as string, c, "edit character");
    await i.editReply({content: `**Character edited: ${name}.**`});
}