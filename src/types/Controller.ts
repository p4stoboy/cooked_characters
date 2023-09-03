import {ApplicationCommandData, Client} from "discord.js";

export type Controller = {
    client: Client;
    commands: Map<string, Map<string, ApplicationCommandData>>;
}