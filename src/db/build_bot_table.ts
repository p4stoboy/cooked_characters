import get_db_connection from "./conn";

const chars = `CREATE TABLE IF NOT EXISTS characters(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name TEXT NOT NULL,
    creator_id VARCHAR(18) NOT NULL,
    bio TEXT NOT NULL,
    image_url TEXT DEFAULT NULL,
    color VARCHAR(7) DEFAULT "#FF6600",
    guild_id VARCHAR(18) NOT NULL,
    active INT DEFAULT 1,
    model INT DEFAULT 1,
    PRIMARY KEY (id)
)`;

const build_db = async () => {
    const conn = await get_db_connection();
    await conn.query(chars);
    await conn.end();
    console.log(`db built`);
}

build_db();