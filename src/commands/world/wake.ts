import { Command } from "../../handlers/command";

export default new Command({
    name: "wake",
    description: "Wake up. Wake up. Wake up. WAKE UP.",
    handler: async (client, args, username, reply) => {
        if (!client.bot.isSleeping) return reply("I'm not sleeping, dummy.");

        await client.bot.wake();
        reply("*yawn* ...morning.");
    },
})
