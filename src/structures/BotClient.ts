import { SapphireClient, SapphireClientOptions } from '@sapphire/framework';
import { Intents } from 'discord.js';
import { join } from 'path';
import { giveawayManager } from '../extenders/giveawayManager';

export class BotClient extends SapphireClient {
    public constructor(options?: SapphireClientOptions) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS
            ],
            defaultPrefix: 'g!',
            allowedMentions: { parse: ["users"], repliedUser: false },
            baseUserDirectory: join(__dirname, ".."),
            caseInsensitiveCommands: true,
            caseInsensitivePrefixes: true,
            ...options
        })
    }

    public giveawayManager: giveawayManager = new giveawayManager(this, {
        default: {
            botsCanWin: false,
            embedColor: '#FF0000',
            embedColorEnd: '#000000',
            reaction: '🎉',
        }
    })
}

declare module "discord.js" {
    export interface Client {
        giveawayManager: giveawayManager;
    }
}