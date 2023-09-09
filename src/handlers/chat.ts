import { TerracottaClient } from "../lib/client";
import { isWhitelisted } from "../lib/common";
import { commands } from "./command";

export async function setupChatHandler(client: TerracottaClient) {
    client.bot.on("chat", async (username, message) => {
        if (username === client.config.username || !message.startsWith(client.config.prefix)) return;
        if (client.config.whitelist.enforce && !isWhitelisted(username)) return client.bot.chat("You are not whitelisted on this bot!");

        const args = message.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift()!.toLowerCase();

        const command = commands.find(c => c.name === commandName);
        if (!command) return;

        if (command.su && !client.config.superusers.includes(username)) return client.bot.chat(`${username} is not in the sudoers file. This incident will be reported.`);

        try {
            if (typeof command.handler === "function") {
                await command.handler(client, args, username);
            } else {
                const subcommand = command.handler.find(s => s.name === args[0]);
                if (!subcommand) return;

                await subcommand.handler(client, args.slice(1), username);
            }
        } catch(e) {
            const error = e as Error;
            client.bot.chat(`An error occurred while executing that command: ${error.message ?? error.toString()}`);
            console.log(error.stack ?? error.toString());
        }
    });
}
