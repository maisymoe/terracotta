import { goals } from "mineflayer-pathfinder";
import { Block } from "prismarine-block";
import { Command } from "../../handlers/command";

export default new Command({
    name: "sleep",
    description: "Find nearest bed, and sleep!",
    handler: async (client) => {
        if (client.bot.time.isDay && !client.bot.isRaining) return client.bot.chat("I can't sleep now, silly!");

        const bed: Block | null = client.bot.findBlock({ matching: (b) => client.bot.isABed(b) });
        if (!bed) return client.bot.chat("Cannot become the eeper, no bed found nearby :(");

        client.bot.chat("Found bed, pathfinding!");
        await client.bot.pathfinder.goto(new goals.GoalGetToBlock(...bed.position.toArray()));
        await client.bot.sleep(bed);
    },
})
