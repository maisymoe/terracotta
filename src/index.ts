import { setupChatHandler } from "./handlers/chat";
import { setupCommandHandler } from "./handlers/command";
import { setupDataLink } from "./lib/data";
import { TerracottaClient } from "./lib/client";

const client = new TerracottaClient({
    config: setupDataLink("config", true),
});

client.bot.once("spawn", async () => {
    console.log("Terracotta is initialising...");
    
    await setupCommandHandler();
    await setupChatHandler(client);

    console.log("Done!");
    client.bot.chat(`Terracotta loaded! See ${client.config.prefix}help.`);
});
