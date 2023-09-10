import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "enforce",
    description: "Get/set whether the whitelist is being enforced.",
    handler: (client, args, username, reply) => {
        if (!args[0]) return reply(`The whitelist is currently ${client.config.whitelist.enforce ? "" : "not"} enforcing.`);
        if (!["true", "false"].includes(args[0])) return reply("Invalid argument! Expected a boolean.");

        const state = JSON.parse(args[0]);

        client.config.whitelist.enforce = state;
        reply(`The whitelist is ${state ? "now" : "no longer"} enforcing.`);
    },
})
