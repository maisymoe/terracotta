import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "add",
    description: "Add a player to the whitelist.",
    handler: (client, args, username, reply) => {
        const name = args[0];
        if (client.config.whitelist.users.includes(name)) return reply("That user is already whitelisted!");

        client.config.whitelist.users.push(name);
        reply(`Added ${name} to the whitelist.`);
    },
})
