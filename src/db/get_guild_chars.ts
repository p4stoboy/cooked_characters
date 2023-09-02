import get_db_connection from "./conn";
import {CharacterProps} from "../types/CharacterProps";

export const get_guild_chars = async (guild_id: string) => {
    const conn = await get_db_connection();
    const [rows] = await conn.query(`SELECT * FROM characters WHERE guild_id = ?`, [guild_id]);
    await conn.end();
    return rows as CharacterProps[];
}