import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { TerracottaClient } from "../lib/client";
import { ReplyFunction } from "./chat";

export type CommandCallback = (client: TerracottaClient, args: string[], username: string, reply: ReplyFunction) => void | Promise<void>;

export interface CommandOptions {
    name: string;
    description: string;
    su?: boolean;
    handler: CommandCallback | Subcommand[];
}

export class Command {
    public name: string;
    public description: string;
    public su?: boolean;
    public handler: CommandCallback | Subcommand[];

    public constructor(co: CommandOptions) {
        this.name = co.name;
        this.description = co.description;
        this.su = co.su;
        this.handler = co.handler;
    };
}

export interface SubcommandOptions {
    name: string;
    description: string;
    handler: CommandCallback;
}

export class Subcommand {
    public name: string;
    public description: string;
    public handler: CommandCallback;

    public constructor(co: SubcommandOptions) {
        this.name = co.name;
        this.description = co.description;
        this.handler = co.handler;
    };
}

export const commands = new Array<Command>;

export async function setupCommandHandler() {
    const root = join(__dirname, "../", "commands/").trim();
    const categoryDirs = await readdir(root);

    for (const category of categoryDirs) {
        const categoryDir = await readdir(join(root, category));
        const commandFiles = categoryDir.filter(i => i.endsWith(".js"));
        const subcommandDirs = categoryDir.filter(i => !i.includes("."));

        for (const subcommand of subcommandDirs) {
            const subcommandFiles = (await readdir(join(root, category, subcommand))).filter(i => i.endsWith(".js") && i !== "meta.js");
            const subcommandData = await Promise.all(subcommandFiles.map(async i => ({ ...(await import(join(root, category, subcommand, i))).default })));
            const metaFile = (await import(join(root, category, subcommand, "meta.js"))).default;
            commands.push({ ...metaFile, options: subcommandData.map(i => ({ name: i.name, description: i.description, options: i.options })), handler: subcommandData });
        }

        for (const commandFile of commandFiles) {
            const command = (await import(join(root, category, commandFile))).default;
            commands.push(command);
        }
    }

    console.log(`Registered ${commands.length} command(s).`)
}
