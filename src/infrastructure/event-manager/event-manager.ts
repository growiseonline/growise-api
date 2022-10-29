import { resolve } from "path";
import { EventEmitter } from "stream";
import { IEvemetMetadata, IEventCosumerCallback, IEventManager } from "./interfaces";

export class EventManager implements IEventManager {

    constructor(private readonly eventEmiter: EventEmitter) { }

    async emit(name: string, data: { [key: string]: any; }, metadata?: { [key: string]: any; }): Promise<void> {
        const metadataConfig: IEvemetMetadata = {
            emitionTime: new Date,
            ...metadata
        }

        new Promise((resolve, reject) => {
            this.eventEmiter.emit(name, data, metadataConfig)
            resolve(undefined)
        })
    }

    async observe(name: string, callback: IEventCosumerCallback): Promise<void> {
        this.eventEmiter.addListener(name, async (payload, metadata) => {
            callback(payload, metadata)
        })
    }
}