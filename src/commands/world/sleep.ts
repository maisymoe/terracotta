import { goals } from "mineflayer-pathfinder";
import { Block } from "prismarine-block";
import { Command } from "../../handlers/command";

export default new Command({
    name: "sleep",
    description: "Find nearest bed, and sleep!",
    handler: async (client, args, username, reply) => {
        if (client.bot.time.isDay && !client.bot.isRaining) return reply("I can't sleep now, silly!");

        const bed: Block | null = client.bot.findBlock({ matching: (b) => client.bot.isABed(b) });
        if (!bed) return reply("Cannot become the eeper, no bed found nearby :(");

        reply("Found bed, pathfinding!");
        await client.bot.pathfinder.goto(new goals.GoalGetToBlock(...bed.position.toArray()));
        await client.bot.sleep(bed);
    },
})
