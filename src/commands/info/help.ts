import { Command, commands } from "../../handlers/command";

export default new Command({
    name: "help",
    description: "Basic info about how to use the bot.",
    handler: (client, args, username, reply) => {
        const filteredCommands = client.config.superusers.includes(username) ? commands : commands.filter(c => !c.su);

        if (args.length === 0) {
            reply(`=== Terracotta - ${client.config.prefix} ===`);
            reply(filteredCommands.map(c => c.name).join(", "));
            reply(`Refer to ${client.config.prefix}help <command name> for more.`);
        } else {
            const commandName = args[0];
            const command = filteredCommands.find(c => c.name === commandName);
            if (!command) return reply(`No info found for ${client.config.prefix}${commandName}.`);

            if (typeof command.handler === "function") {
                reply(`${client.config.prefix}${command.name} - ${command.description}`);
            } else {
                const subcommandName = args[1];

                if (!subcommandName) {
                    reply(`=== ${client.config.prefix}${command.name} subcommands ===`);
                    reply(command.handler.map(s => s.name).join(", "));
                } else {
                    const subcommand = command.handler.find(s => s.name === subcommandName);
                    const fullName = `${client.config.prefix}${command.name} ${subcommandName}`;
                    if (!subcommand) return reply(`No info found for ${fullName}.`);
                    
                    reply(`${fullName} - ${subcommand.description}`);
                }
            }
        }
    },
})
