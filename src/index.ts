import { codeBlock } from "discord.js";
import { setupChatHandler } from "./handlers/chat";
import { setupCommandHandler } from "./handlers/command";
import { setupDataLink } from "./lib/data";
import { TerracottaClient } from "./lib/client";
import { log } from "./lib/logging";

export const client = new TerracottaClient({
    config: setupDataLink("config", true),
});

client.bot.once("spawn", async () => {
    console.log("Terracotta is initialising...");
    log("info", {
        description: `Connected to server at ${client.config.server.host}...`,
        fields: [
            { name: "Version", value: `${client.bot.version} (${client.bot.protocolVersion})`, inline: true },
            // @ts-expect-error Why is serverBrand not in the types???
            { name: "Brand", value: client.bot.game.serverBrand, inline: true },
            { name: "Dimension", value: client.bot.game.dimension, inline: true },
            { name: `Players ${Object.keys(client.bot.players).length}/${client.bot.game.maxPlayers}`, value: codeBlock(Object.keys(client.bot.players).join(", ")) },
        ]
    });
    
    await setupCommandHandler();
    await setupChatHandler(client);

    console.log("Done!");
    client.bot.chat(`Terracotta loaded! See ${client.config.prefix}help.`);
});
