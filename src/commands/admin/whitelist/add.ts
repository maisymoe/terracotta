import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "add",
    description: "Add a player to the whitelist.",
    handler: (client, args) => {
        const username = args[0];
        if (client.config.whitelist.users.includes(username)) return client.bot.chat("That user is already whitelisted!");

        client.config.whitelist.users.push(username);
        client.bot.chat(`Added ${username} to the whitelist.`);
    },
})
