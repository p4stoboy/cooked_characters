import {Client} from "discord.js";
import {editchar} from "../editchar";
import {deletechar} from "../deletechar";


export const update_edit_and_delete_commands = async (guild_id: string, client: Client) => {
    const guild = await client.guilds.fetch(guild_id);
    const new_edit_command = await editchar(guild_id);
    const old_edit_command = guild.commands.cache.reduce((a,b) => b.name === "editchar" ? b : a);
    await guild.commands.delete(old_edit_command);
    await guild.commands.create(new_edit_command);
    const new_delete_command = await deletechar(guild_id);
    const old_delete_command = guild.commands.cache.reduce((a,b) => b.name === "deletechar" ? b : a);
    await guild.commands.delete(old_delete_command);
    await guild.commands.create(new_delete_command);
}