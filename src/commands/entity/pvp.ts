import { Command } from "../../handlers/command";

export default new Command({
    name: "pvp",
    description: "Fight! Fight! Fight!",
    handler: async (client, args) => {
        const name = args[0];
        if (!name) return client.bot.chat("Invalid arguments! Need a player name.");

        const player = client.bot.players[name];
        if (!player) return client.bot.chat(`I can't see ${name}...`);

        client.bot.pvp.attack(player.entity);
    },
})
