import { CommandOptions, Command } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "ping",
    description: "ping pong with the bot",
    requiredClientPermissions: ["SEND_MESSAGES"]
})

export class clientCommand extends Command {
    public async run(message: Message) {
        const msg = await message.channel.send('Ping?');

        return msg.edit(
            `Pong! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${msg.createdTimestamp - message.createdTimestamp}ms.`
        );
    }
}