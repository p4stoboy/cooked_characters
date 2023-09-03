import get_db_connection from "./conn";
import {CharacterProps} from "../types/CharacterProps";

export const new_db_character = async (name: string, bio: string, creator_id: string, image_url: string, guild_id: string, color: string, model: number): Promise<CharacterProps> => {
    let char;
    try {
        const conn = await get_db_connection();
        await conn.query(`INSERT INTO characters(name, bio, creator_id, image_url, guild_id, color, model) VALUES(?, ?, ?, ?, ?, ?, ?)`, [name, bio, creator_id, image_url, guild_id, color, model]);
        const res = await conn.query(`SELECT * FROM characters WHERE creator_id = ? ORDER BY id DESC LIMIT 1`, [creator_id]);
        char = res[0];
        await conn.end();
    } catch(e) {
        console.log(e);
    }
    return char;
}