import get_db_connection from "./conn";
import {CharacterProps} from "../types/CharacterProps";

export const edit_db_character = async (id: number, name: string, bio: string, image_url: string, color: string, model: number): Promise<CharacterProps> => {
    let char;
    try {
        const conn = await get_db_connection();
        await conn.query(`UPDATE characters SET name = ?, bio = ?, image_url = ?, color = ?, model = ? WHERE id = ?`, [name, bio, image_url, color, model, id]);
        const res = await conn.query(`SELECT * FROM characters WHERE id = ? ORDER BY id DESC LIMIT 1`, [id]);
        char = res[0];
        await conn.end();
    } catch(e) {
        console.log(e);
    }
    return char;
}