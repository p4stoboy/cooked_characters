import {Controller} from "./Controller";


export type ClientCommand = (interaction: any, guild_id: string, c: Controller) => Promise<void>;
