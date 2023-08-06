import { TerracottaClient } from "../lib/client";
import { commands } from "./command";

export async function setupChatHandler(client: TerracottaClient) {
    client.bot.on("chat", async (username, message) => {
        if (username === client.config.username || !message.startsWith(client.config.prefix)) return;

        const args = message.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift()!.toLowerCase();

        const command = commands.find(c => c.name === commandName);
        if (!command) return;

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
