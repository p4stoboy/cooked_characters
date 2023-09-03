import get_db_connection from "./conn";


export const get_char_by_id = async (id: number) => {
    try {
        const conn = await get_db_connection();
        const res = await conn.query("SELECT * FROM characters WHERE id = ? AND active = 1", [id]);
        conn.end();
        if (!res[0]) throw new Error(`no character with id ${id}`);
        return res[0];
    } catch(e) {
        console.log(e);
    }
}