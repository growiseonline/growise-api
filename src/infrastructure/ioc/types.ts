
export const TYPES = {

    // infrastructure
    SQLConnection: Symbol.for('SQLConnection'),
    NoSQLConnection: Symbol.for('NoSQLConnection'),
    AplicationContext: Symbol.for('AplicationContext'),
    EventManager: Symbol.for('EventManager'),

    // events
    // WorkHiringEvents: Symbol.for('WorkHiringEvents'),

    // repository 
    TennantRepository: Symbol.for('TennantRepository'),

    // infrastructure
    WebApiService: Symbol.for('WebApiService'),

    // action 
    CreateTennantAction: Symbol.for('CreateTennantAction'),
    GetTennantAction: Symbol.for('GetTennantAction'),

    // presentation 
    CreateTennantPresentation: Symbol.for('CreateTennantPresentation'),
    GetTennantPresentation: Symbol.for('GetTennantPresentation'),
}