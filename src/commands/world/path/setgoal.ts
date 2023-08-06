import { goals } from "mineflayer-pathfinder";
import { Subcommand } from "../../../handlers/command";

export default new Subcommand({
    name: "setgoal",
    description: "Set a goal to pathfind to.",
    handler: (client, args, username) => {
        const usePlayerPos = args[0]?.toLowerCase() === "here";
        if (!usePlayerPos && (args.length <= 3 || args.slice(0, 3).some(i => isNaN(Number(i))))) return client.bot.chat("Invalid arguments! Needs either \"here\" or an X, Y and Z coordinate.");

        const { x, y, z } = usePlayerPos ? client.bot.players[username]?.entity.position : Object.fromEntries(args.map((arg, idx) => [["x", "y", "z"][idx], Number(arg)]));

        client.bot.pathfinder.setGoal(new goals.GoalBlock(x, y, z), args.includes("persist"));
        client.bot.chat("Set pathfinder goal to given coordinate.");
    },
})
