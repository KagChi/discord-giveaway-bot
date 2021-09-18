import { CommandOptions, Command, Args } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";
import { Message, MessageEmbed } from "discord.js";

@ApplyOptions<CommandOptions>({
    name: "pause",
    description: "pause giveaway in current channel or different channel",
    requiredClientPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    detailedDescription: "usage: g!pause 888728606640078879",
    requiredUserPermissions: ["MANAGE_GUILD"]
})

export class clientCommand extends Command {
    public async run(message: Message, args: Args) {
        const giveawayId = (await args.pickResult("number")).value || message.reference?.messageId!;
        if (!giveawayId) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("Please input message id/reply message you want to pause!")
                ]
            })
        }
        const giveawayValue = this.container.client.giveawayManager.giveaways.find(x => x.messageId === `${giveawayId}` && x.guildId === message.guildId);
        if (!giveawayValue) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("No giveaway found with provided messageId!")
                ]
            })
        } else if (giveawayValue.ended) {
            return message.reply({
                embeds: [
                    new MessageEmbed()
                        .setDescription("That giveaway already ended!")
                ]
            })
        }
        //@ts-ignore
        this.container.client.giveawayManager.pause(giveawayValue.messageId!);
    }
}