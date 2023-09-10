import { TerracottaClient } from "../lib/client";
import { constants, isWhitelisted } from "../lib/common";
import { commands } from "./command";

export type ReplyFunction = (message: string) => void;
const getReplyFunction = (client: TerracottaClient, isMsg: boolean, username: string): ReplyFunction => (message: string) => client.bot.chat((isMsg ? `/msg ${username} ` : "") + message);

export async function setupChatHandler(client: TerracottaClient) {
    client.bot.on("chat", async (username, message) => {
        const isMsg =  message.startsWith(constants.ESSENTIALS_MSG_PREFIX);
        const prefix = isMsg ? constants.ESSENTIALS_MSG_PREFIX : client.config.prefix;
        if (username === client.config.username || !message.startsWith(prefix)) return;

        const reply = getReplyFunction(client, isMsg, username);

        if (client.config.whitelist.enforce && !isWhitelisted(username)) return reply("You are not whitelisted on this bot!");

        const args = message.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift()!.toLowerCase();

        const command = commands.find(c => c.name === commandName);
        if (!command) return;

        if (command.su && !client.config.superusers.includes(username)) return reply(`${username} is not in the sudoers file. This incident will be reported.`);

        try {
            if (typeof command.handler === "function") {
                await command.handler(client, args, username, reply);
            } else {
                const subcommand = command.handler.find(s => s.name === args[0]);
                if (!subcommand) return;

                await subcommand.handler(client, args.slice(1), username, reply);
            }
        } catch(e) {
            const error = e as Error;
            reply(`An error occurred while executing that command: ${error.message ?? error.toString()}`);
            console.log(error.stack ?? error.toString());
        }
    });
}
