import get_db_connection from "./conn";
import {CharacterProps} from "../types/CharacterProps";

export const edit_db_character = async (id: number, name: string, bio: string, creator_id: string, image_url: string, guild_id: string, color: string): Promise<CharacterProps> => {
    let char;
    try {
        const conn = await get_db_connection();
        await conn.query(`UPDATE characters SET (name, bio, creator_id, image_url, guild_id, color) VALUES(?, ?, ?, ?, ?, ?) WHERE id = ?`, [name, bio, creator_id, image_url, guild_id, color, id]);
        const res = await conn.query(`SELECT * FROM characters WHERE id = ? ORDER BY id DESC LIMIT 1`, [id]);
        char = res[0];
        await conn.end();
    } catch(e) {
        console.log(e);
    }
    return char;
}