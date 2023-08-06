import { EmbedBuilder, EmbedData, HexColorString, resolveColor } from "discord.js";
import { client } from "..";

const palette: Record<string, HexColorString> = {
    info: "#A690A4",
    warn: "#FCD0A1",
    error: "#D37C99",
    success: "#B1B695",
}

type LogType = "info" | "warn" | "error" | "success";

export function log(type: LogType, data: string | EmbedData) {
    const baseEmbedData: EmbedData = { color: resolveColor(palette[type]) }

    if (typeof data === "string") {
        client.webhook.send({ embeds: [new EmbedBuilder({ ...baseEmbedData, description: data })] });
    } else {
        client.webhook.send({ embeds: [new EmbedBuilder({ ...baseEmbedData, ...data })] });
    }
}
