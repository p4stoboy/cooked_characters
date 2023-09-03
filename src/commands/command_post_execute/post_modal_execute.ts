import {update_guild_commands} from "./update_guild_commands";
import {Controller} from "../../types/Controller";

export const post_modal_execute = async (guild_id: string, c: Controller, type: string) => {
    try {
        await update_guild_commands(guild_id, c);
        console.log(`Commands updated after ${type} modal`);
    } catch(e) {
        console.log(e);
        console.error(`Error updating commands after ${type} modal`);
    }
}