import { GiveawaysManager } from 'discord-giveaways';
import Enmap from 'enmap';

const enmapDatabase = new Enmap({ name: "giveaways" });

export class giveawayManager extends GiveawaysManager {
    

    public async getAllGiveaways() {
        return enmapDatabase.fetchEverything().array();
    }

    public async saveGiveaway(messageId: string, giveawayData: any) {
        enmapDatabase.set(messageId, giveawayData);
        return true;
    }

    public async editGiveaway(messageId: string, giveawayData: any) {
        enmapDatabase.set(messageId, giveawayData);
        return true;
    }

    public async deleteGiveaway(messageId: string) {
        enmapDatabase.delete(messageId);
        return true;
    }
}