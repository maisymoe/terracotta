import { client } from "..";

export const constants = {
    ESSENTIALS_MSG_PREFIX: "me]",
}

export const isWhitelisted = (username: string) => [...client.config.superusers, ...client.config.whitelist.users].includes(username);
export function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
