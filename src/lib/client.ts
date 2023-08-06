import { WebhookClient } from "discord.js";
import { Bot, createBot } from "mineflayer";

export interface Config {
    server: {
        apiKey: string;
        host: string;
        port?: number;
    }
    webhook: {
        id: string;
        token: string;
    }
    username: string;
    prefix: string;
}

export interface TerracottaClientOptions {
    config: Config;
}

export class TerracottaClient {
    public config: Config;
    public webhook: WebhookClient; 
    public bot: Bot;

    constructor(options: TerracottaClientOptions) {
        this.config = options.config;
        this.webhook = new WebhookClient(this.config.webhook);

        this.bot = createBot({
            username: this.config.username,
            host: `scraft_${this.config.server.apiKey}.${this.config.server.host}`,
            port: this.config.server.port || 25565,
        });
    }
}
