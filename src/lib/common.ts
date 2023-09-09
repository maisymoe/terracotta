import { client } from ".."

export const isWhitelisted = (username: string) => [...client.config.superusers, ...client.config.whitelist.users].includes(username);
