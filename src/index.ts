import { codeBlock } from "discord.js";
import { pathfinder, Movements } from "mineflayer-pathfinder";
import { plugin as pvp } from "mineflayer-pvp";
import { setupChatHandler } from "./handlers/chat";
import { setupCommandHandler } from "./handlers/command";
import { setupDataLink } from "./lib/data";
import { TerracottaClient } from "./lib/client";
import { log } from "./lib/logging";

export const client = new TerracottaClient({
    config: setupDataLink("config", true),
    mineflayerPlugins: [pathfinder, pvp],
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
    client.bot.pathfinder.setMovements(new Movements(client.bot));

    console.log("Done!");
    if (client.config.showJoinMessage) client.bot.chat(`Terracotta loaded! See ${client.config.prefix}help.`);
});
