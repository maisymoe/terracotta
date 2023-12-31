import { Command } from "../../handlers/command";

const AsyncFunction = (async function () {}).constructor;

export default new Command({
    name: "eval",
    description: "Evaluates the given JavaScript as an asynchronous function.",
    su: true,
    handler: async (client, args, username, reply) => {
        const code = args.join(" ");

        try {
            const result = await (AsyncFunction("client", "args", "username", "require", code))(client, username, args, require);
            if (result !== undefined) reply(JSON.stringify(result).substring(0, 1024));
        } catch (error) {
            const typedError = error as Error;
            reply((typedError.message ?? typedError.toString()).substring(0, 1024));
        }
    },
})
