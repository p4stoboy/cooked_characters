import {Connection, createConnection} from "mariadb";
import 'dotenv/config';

const create_connection = async (database?: string): Promise<Connection> => await createConnection({
    database,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

let conn: Connection;
export default async function get_db_connection(): Promise<Connection> {
    if (!conn || !conn.isValid()) {
        conn = await create_connection(process.env.DB_NAME);
    }
    return conn;
}