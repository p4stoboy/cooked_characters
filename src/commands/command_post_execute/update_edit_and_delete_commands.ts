import {editchar} from "../editchar";
import {deletechar} from "../deletechar";
import {Controller} from "../../types/Controller";


export const update_edit_and_delete_commands = async (guild_id: string, c: Controller) => {
    const guild = await c.client.guilds.fetch(guild_id);
    const new_edit_command = await editchar(guild_id);
    const old_edit_command = guild.commands.cache.reduce((a,b) => b.name === "editchar" ? b : a);
    if (old_edit_command) {
        await guild.commands.delete(old_edit_command);
    }
    await guild.commands.create(new_edit_command);
    const new_delete_command = await deletechar(guild_id);
    const old_delete_command = guild.commands.cache.reduce((a,b) => b.name === "deletechar" ? b : a);
    if (old_delete_command) {
        await guild.commands.delete(old_delete_command);
    }
    await guild.commands.create(new_delete_command);
    c.commands.get(guild_id)?.set(new_edit_command.name, new_edit_command);
    c.commands.get(guild_id)?.set(new_delete_command.name, new_delete_command);
}