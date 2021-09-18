import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed, TextChannel } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "drop",
    description: "drop giveaway in current channel or different channel",
    requiredClientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    detailedDescription: "usage: g!drop 4 nitro classic",
    requiredUserPermissions: ["MANAGE_GUILD"],
})

export class clientCommand extends Command {
    public async run(message: Message, args: Args) {
        const giveawayChannel = (await args.pickResult('guildTextChannel')).value ?? message.channel;
        const giveawayWinners = await args.pickResult('number');
        const giveawayPrize = await args.restResult('string');
        if (!giveawayWinners.success) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Please input total giveaway winners!")
                ]
            })
        } else if (!giveawayPrize.success) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Please input giveaway prize!")
                ]
            })
        }
        this.container.client.giveawayManager.start(giveawayChannel as TextChannel, {
            prize: giveawayPrize.value,
            winnerCount: giveawayWinners.value,
            hostedBy: message.author ?? this.container.client,
            isDrop: true,
            
        })
    }
}