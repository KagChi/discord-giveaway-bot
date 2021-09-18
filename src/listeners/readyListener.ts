import { Listener, ListenerOptions } from "@sapphire/framework";
import { ApplyOptions } from "@sapphire/decorators";

@ApplyOptions<ListenerOptions>({
    name: "ready",
    once: true,
})

export default class clientListener extends Listener {
    run() {
        this.container.logger.info(`[INFO] ${this.container.client.user?.username} Connected to discord websocket`);
        this.container.client.user?.setActivity({
            type: "PLAYING",
            name: "g!help for info!"
        });
        this.container.logger.info(`[INFO] Loaded total ${this.container.stores.get('commands').size} command(s)`);
    }
}