import { Subcommand } from "../../../handlers/command";
import { getRandomInt } from "../../../lib/common";

const messages = [
    "I am going to fucking murder $name.",
    "$name will face my wrath.",
    "I am going to beat the shit out of $name.",
];

export default new Subcommand({
    name: "attack",
    description: "Fight! Fight! Fight!",
    handler: async (client, args) => {
        const name = args[0];
        if (!name) return client.bot.chat("Invalid arguments! Need a player name.");

        const player = client.bot.players[name];
        if (!player) return client.bot.chat(`I can't see ${name}...`);

        client.bot.pvp.attack(player.entity);

        const message = messages[getRandomInt(0, messages.length - 1)];
        client.bot.chat(message.replace(/\$name/g, name));
    },
})
