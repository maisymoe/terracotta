import { Command } from "../../handlers/command";

export default new Command({
    name: "test",
    description: "Simple test command",
    handler: (client, args, username) => {
        client.bot.chat(`Hello, ${username}! You gave ${args.length === 0 ? "no arguments" : args.join(", ")}.`);
    },
})
