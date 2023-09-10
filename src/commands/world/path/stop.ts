import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "stop",
    description: "Stop the pathfinder immediately.",
    handler: (client, args, username, reply) => {
        client.bot.pathfinder.stop();
        reply("Pathfinder stopped.")
    },
})
