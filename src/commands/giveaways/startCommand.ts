import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed, TextChannel } from "discord.js";
import ms from 'ms';

@ApplyOptions<CommandOptions>({
    name: "start",
    description: "start giveaway in current channel or different channel",
    requiredClientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    detailedDescription: "usage: g!start 4 nitro classic --time=12h",
    requiredUserPermissions: ["MANAGE_GUILD"],
    options: ["t", "time"]
})

export class clientCommand extends Command {
    public async run(message: Message, args: Args) {
        const giveawayChannel = (await args.pickResult('guildTextChannel')).value ?? message.channel;
        const giveawayWinners = await args.pickResult('number');
        const giveawayPrize = await args.restResult('string');
        const giveawayTime = args.getOption("t", 'time') as unknown as number | null;
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
        } else if (!giveawayTime) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Please input giveaway time!")
                ]
            })
        }
        this.container.client.giveawayManager.start(giveawayChannel as TextChannel, {
            prize: giveawayPrize.value,
            winnerCount: giveawayWinners.value,
            hostedBy: message.author ?? this.container.client,
            duration: parseInt(ms(giveawayTime)),
        })
    }
} 