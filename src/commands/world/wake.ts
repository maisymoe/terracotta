import { Command } from "../../handlers/command";

export default new Command({
    name: "wake",
    description: "Wake up. Wake up. Wake up. WAKE UP.",
    handler: async (client) => {
        if (!client.bot.isSleeping) return client.bot.chat("I'm not sleeping, dummy.");

        await client.bot.wake();
        client.bot.chat("*yawn* ...morning.");
    },
})
