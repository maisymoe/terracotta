import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "enforce",
    description: "Get/set whether the whitelist is being enforced.",
    handler: (client, args) => {
        if (!args[0]) return client.bot.chat(`The whitelist is currently ${client.config.whitelist.enforce ? "" : "not"} enforcing.`);
        if (!["true", "false"].includes(args[0])) return client.bot.chat("Invalid argument! Expected a boolean.");

        const state = JSON.parse(args[0]);

        client.config.whitelist.enforce = state;
        client.bot.chat(`The whitelist is ${state ? "now" : "no longer"} enforcing.`);
    },
})
