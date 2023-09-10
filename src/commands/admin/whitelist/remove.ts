import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "remove",
    description: "Remove a player from the whitelist.",
    handler: (client, args, username, reply) => {
        const name = args[0];
        if (!client.config.whitelist.users.includes(name)) return reply("That user is not whitelisted!");

        client.config.whitelist.users = client.config.whitelist.users.filter(i => i !== name);
        reply(`Removed ${name} from the whitelist.`);
    },
})
