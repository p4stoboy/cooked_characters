import {get_guild_edit_command} from "../get_guild_edit_command";
import {get_guild_delete_command} from "../get_guild_delete_command";
import {Controller} from "../../types/Controller";
import {get_guild_say_command} from "../get_guild_say_command";
import {get_guild_chars} from "../../db/get_guild_chars";
import {get_guild_bio_command} from "../get_guild_bio_command";


export const update_guild_commands = async (guild_id: string, c: Controller, fresh: boolean = false) => {
    const guild = await c.client.guilds.fetch(guild_id);
    const chars = await get_guild_chars(guild_id);
    if (chars.length === 0) {
        guild.commands.set([]);
        return;
    }
    const new_say_command = await get_guild_say_command(guild_id);
    const new_edit_command = await get_guild_edit_command(guild_id);
    const new_delete_command = await get_guild_delete_command(guild_id);
    const new_bio_command = await get_guild_bio_command(guild_id);

    if (guild.commands.cache.size !== 0) {
        const old_say_command = guild.commands.cache.reduce((a,b) => b.name === "say" ? b : a);
        const old_edit_command = guild.commands.cache.reduce((a,b) => b.name === "editchar" ? b : a);
        const old_delete_command = guild.commands.cache.reduce((a,b) => b.name === "deletechar" ? b : a);
        const old_bio_command = guild.commands.cache.reduce((a,b) => b.name === "bio" ? b : a);
        await guild.commands.edit(old_say_command, new_say_command);
        await guild.commands.edit(old_edit_command, new_edit_command);
        await guild.commands.edit(old_delete_command, new_delete_command);
        await guild.commands.edit(old_bio_command, new_bio_command);
        console.log(`Successfully EDITED application commands in ${guild.name}.`)
    } else {
        await guild.commands.create(new_say_command);
        await guild.commands.create(new_edit_command);
        await guild.commands.create(new_delete_command);
        await guild.commands.create(new_bio_command);
        console.log(`Successfully CREATED application commands in ${guild.name}.`)
    }
}