import { goals } from "mineflayer-pathfinder";
import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "setgoal",
    description: "Set a goal to pathfind to.",
    handler: (client, args, username) => {
        const usePlayerPos = args[0]?.toLowerCase() === "here";
        // TODO: This doesn't accept coords and I don't know why
        if (!usePlayerPos && (args.length <= 3 || args.slice(0, 3).some(i => isNaN(Number(i))))) return client.bot.chat("Invalid arguments! Needs either \"here\" or an X, Y and Z coordinate.");

        const player = client.bot.players[username];
        if (!player && usePlayerPos) return client.bot.chat(`I can't see you...`);
        
        const { x, y, z } = usePlayerPos ? player.entity.position : Object.fromEntries(args.map((arg, idx) => [["x", "y", "z"][idx], Number(arg)]));

        client.bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z), args.includes("persist"));
        client.bot.chat("Set pathfinder goal to given coordinate.");
    },
})
