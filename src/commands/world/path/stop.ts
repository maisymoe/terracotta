import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "stop",
    description: "Stop the pathfinder immediately.",
    handler: (client) => {
        client.bot.pathfinder.stop();
        client.bot.chat("Pathfinder stopped.")
    },
})
