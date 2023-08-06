import { CommandCallback, Subcommand } from "../../../handlers/command";
import testCommand from "../test";

export default new Subcommand({
    name: "happy",
    description: "I am a subcommand :)",
    handler: testCommand.handler as CommandCallback,
})
