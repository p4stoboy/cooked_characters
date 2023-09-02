import get_db_connection from "./conn";
import {ModalSubmitFields, ModalSubmitInteraction} from "discord.js";
import {register_commands} from "../commands/register_commands";
import {add_char_command} from "../commands/add_char_command";

export const new_character = async (i: ModalSubmitInteraction): Promise<void> => {
    const f = i.fields;
    const name = f.getTextInputValue(`name`);
    const bio = f.getTextInputValue(`bio`);
    const creator_id = i.user.id;
    const image_url = f.getTextInputValue(`image_url`);

    try {
        const conn = await get_db_connection();
        await conn.query(`INSERT INTO characters(name, bio, creator_id, image_url) VALUES(?, ?, ?, ?)`, [name, bio, creator_id, image_url]);
        const res = await conn.query(`SELECT * FROM characters WHERE creator_id = ? ORDER BY id DESC LIMIT 1`, [creator_id]);
        const char = res[0];
        console.log(char);
        await i.editReply({content: `**Character created.**`});
        await conn.end();
        await add_char_command(i.client, i.guildId as string, char);
    } catch(e) {
        console.log(e);
    }
}