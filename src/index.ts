import { BotClient } from "./structures/BotClient";

console.log('[INFO] Trying connect to discord')
const discordClient = new BotClient();
discordClient.login();