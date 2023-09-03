import {ModalSubmitInteraction} from "discord.js";
import {new_db_character} from "../../db/new_db_character";
import {Controller} from "../../types/Controller";
import {post_modal_execute} from "../command_post_execute/post_modal_execute";


export const new_character_modal_submit = async (i: ModalSubmitInteraction, c: Controller): Promise<void> => {
    await i.deferReply();
    const f = i.fields;
    const name = f.getTextInputValue(`name`);
    const bio = f.getTextInputValue(`bio`);
    const creator_id = i.user.id;
    const image_url = f.getTextInputValue(`image_url`);
    const color = f.getTextInputValue(`color`);
    await new_db_character(name, bio, creator_id, image_url, i.guildId as string, color);
    await post_modal_execute(i.guildId as string, c, "new character");
    await i.editReply({content: `**Character created: ${name}.**`});
}