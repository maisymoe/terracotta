import { Command, commands } from "../../handlers/command";

export default new Command({
    name: "help",
    description: "Basic info about how to use the bot.",
    handler: (client, args) => {
        if (args.length === 0) {
            client.bot.chat(`=== Terracotta - ${client.config.prefix} ===`);
            client.bot.chat(commands.map(c => c.name).join(", "));
            client.bot.chat(`Refer to ${client.config.prefix}help <command name> for more.`);
        } else {
            const commandName = args[0];
            const command = commands.find(c => c.name === commandName);
            if (!command) return client.bot.chat(`No info found for ${client.config.prefix}${commandName}.`);

            if (typeof command.handler === "function") {
                client.bot.chat(`${client.config.prefix}${command.name} - ${command.description}`);
            } else {
                const subcommandName = args[1];

                if (!subcommandName) {
                    client.bot.chat(`=== ${client.config.prefix}${command.name} subcommands ===`);
                    client.bot.chat(command.handler.map(s => s.name).join(", "));
                } else {
                    const subcommand = command.handler.find(s => s.name === subcommandName);
                    const fullName = `${client.config.prefix}${command.name} ${subcommandName}`;
                    if (!subcommand) return client.bot.chat(`No info found for ${fullName}.`);
                    
                    client.bot.chat(`${fullName} - ${subcommand.description}`);
                }
            }
        }
    },
})
