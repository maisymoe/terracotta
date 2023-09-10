import { WebhookClient } from "discord.js";
import { Bot, Plugin, createBot } from "mineflayer";

const maybeScraftifyHost = (config: Config) => config.server.apiKey ? `scraft_${config.server.apiKey}.${config.server.host}` : config.server.host;

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
    showJoinMessage: boolean;
    superusers: string[];
    whitelist: {
        enforce: boolean;
        users: string[];
    }
}

export interface TerracottaClientOptions {
    config: Config;
    mineflayerPlugins?: Plugin[];
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
            auth: this.config.server.apiKey ? "offline" : "microsoft",
            host: maybeScraftifyHost(this.config),
            port: this.config.server.port || 25565,
        });

        if (options.mineflayerPlugins) this.bot.loadPlugins(options.mineflayerPlugins);
    }
}
