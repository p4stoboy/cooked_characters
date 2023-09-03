import get_db_connection from "./conn";
export const delete_db_character = async (id: number): Promise<void> => {
    try {
        const conn = await get_db_connection();
        await conn.query(`UPDATE characters SET active = 0 WHERE id = ?`, [id]);
        await conn.end();
    } catch(e) {
        console.log(e);
    }
}