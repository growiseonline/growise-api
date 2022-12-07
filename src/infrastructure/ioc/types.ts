
export const TYPES = {

    // infrastructure
    SQLConnection: Symbol.for('SQLConnection'),
    NoSQLConnection: Symbol.for('NoSQLConnection'),
    AplicationContext: Symbol.for('AplicationContext'),
    EventManager: Symbol.for('EventManager'),
    HttpClient: Symbol.for('HttpClient'),
    WebApiService: Symbol.for('WebApiService'),

    // events
    // WorkHiringEvents: Symbol.for('WorkHiringEvents'),

    // repository  

    // infrastructure 

    // action  
    GetTennantDataAction: Symbol.for('GetTennantData'),

    // presentation  ,
    GetTennantDataPresentation: Symbol.for('GetTennantDataPresentation'),

    // rest
    TennantMasterClient: Symbol.for('TennantMasterClient')

}