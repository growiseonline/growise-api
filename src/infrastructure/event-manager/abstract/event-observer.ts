import { IEventCosumerCallback, IEventManager } from "../interfaces";

export abstract class EventObserver {

    constructor(protected readonly eventManager: IEventManager) { }

    async observe(name: string, callback: IEventCosumerCallback) {
        this.eventManager.observe(name, callback)
    }
}