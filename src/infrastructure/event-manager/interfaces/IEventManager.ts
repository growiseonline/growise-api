

export interface IEvemetMetadata {
    emitionTime: Date
}

export type IEventCosumerCallback = (payload: { [key: string]: any }, metadata: { [key: string]: any }) => void

export interface IEventManager {
    emit(name: string, data: { [key: string]: any }, metadata?: { [key: string]: any }): Promise<void>
    observe(name: string, callback: IEventCosumerCallback): Promise<void>
}