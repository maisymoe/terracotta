import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "stop",
    description: "Stop fighting immediately.",
    handler: (client) => {
        client.bot.pvp.stop();
        client.bot.chat("My lust for blood has ended.");
    },
})
