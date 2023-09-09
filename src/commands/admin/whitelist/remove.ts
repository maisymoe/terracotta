import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "remove",
    description: "Remove a player from the whitelist.",
    handler: (client, args) => {
        const username = args[0];
        if (!client.config.whitelist.users.includes(username)) return client.bot.chat("That user is not whitelisted!");

        client.config.whitelist.users = client.config.whitelist.users.filter(i => i !== username);
        client.bot.chat(`Removed ${username} from the whitelist.`);
    },
})
