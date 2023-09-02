import get_db_connection from "./conn";
import {ModalSubmitFields, ModalSubmitInteraction} from "discord.js";
import {register_commands} from "../commands/register_commands";

export const new_character = async (i: ModalSubmitInteraction): Promise<void> => {
    const f = i.fields;
    const name = f.getTextInputValue(`name`);
    const bio = f.getTextInputValue(`bio`);
    const creator_id = i.user.id;
    const image_url = f.getTextInputValue(`image_url`);

    try {
        const conn = await get_db_connection();
        await conn.query(`INSERT INTO characters(name, bio, creator_id, image_url) VALUES(?, ?, ?, ?)`, [name, bio, creator_id, image_url]);
        await i.editReply({content: `**Character created.**`});
        await conn.end();
        await register_commands(i.client, i.guildId as string);
    } catch(e) {
        console.log(e);
    }
}