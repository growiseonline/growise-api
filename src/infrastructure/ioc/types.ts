
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
    UserRepository: Symbol.for('UserRepository'),

    // infrastructure 

    // action  
    GetTennantDataAction: Symbol.for('GetTennantData'),
    SyncronizeTennant: Symbol.for('SyncronizeTennant'),
    CreateUserAction: Symbol.for('CreateUserAction'),
    FindUserAction: Symbol.for('FindUserAction'),

    // presentation  ,
    GetTennantDataPresentation: Symbol.for('GetTennantDataPresentation'),
    CreateUserPresentation: Symbol.for('CreateUserPresentation'),

    // rest
    TennantMasterClient: Symbol.for('TennantMasterClient')

}