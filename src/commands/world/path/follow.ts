import { goals } from "mineflayer-pathfinder";
import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "follow",
    description: "Follow a player.",
    handler: (client, args, username, reply) => {
        const name = args[0] ?? username;
        const { entity } = client.bot.players[name];

        const player = client.bot.players[name];
        if (!player) return reply(`I can't see ${name}...`);

        client.bot.pathfinder.setGoal(new goals.GoalFollow(entity, 1), true);
        reply(`Now following ${name}.`);
    },
})
