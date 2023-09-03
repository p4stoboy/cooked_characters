import {ClientCommand} from "../types/ClientCommand";
import {say_execute} from "./get_guild_say_command";
import {edit_execute} from "./get_guild_edit_command";
import {delete_execute} from "./get_guild_delete_command";
import {bio_execute} from "./get_guild_bio_command";


const client_commands = new Map<string, ClientCommand>();
client_commands.set(`say`, say_execute);
client_commands.set(`editchar`, edit_execute);
client_commands.set(`deletechar`, delete_execute);
client_commands.set(`bio`, bio_execute);

export default client_commands;