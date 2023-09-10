import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "stop",
    description: "Stop fighting immediately.",
    handler: (client, args, username, reply) => {
        client.bot.pvp.stop();
        reply("My lust for blood has ended.");
    },
})
