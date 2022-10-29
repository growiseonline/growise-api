import { Container } from "inversify";
import 'reflect-metadata';
import { EventEmitter } from "stream";
import { DataSource } from 'typeorm';
import { CreateTennantAction, GetTennantAction } from "../../app/tennant";
import { CreateTennantPresentation } from "../../presentation/tennant/create-tennant.presentation";
import { GetTennantPresentation } from "../../presentation/tennant/get-tennant.presentation";
import { EventManager } from "../event-manager";
import { ApiHttpServer } from '../http/server/api-http-server';
import { IHttpServer } from '../http/server/interfaces';
import { TennantRepository } from "../repository/tennant.repository";
import { TYPES } from './types';


export async function handleIoc(sqlConnection: any, noSqlConnection: any) {
    const eventManager = new EventManager(new EventEmitter())
    const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

    container.bind(TYPES.EventManager).toConstantValue(eventManager)

    // infrastructure
    container.bind(TYPES.AplicationContext).toConstantValue(container)

    container.bind<DataSource>(TYPES.SQLConnection).toConstantValue(sqlConnection)
    container.bind<DataSource>(TYPES.NoSQLConnection).toConstantValue(noSqlConnection)

    container.bind<IHttpServer>(TYPES.WebApiService).to(ApiHttpServer)

    // repository  
    container.bind(TYPES.TennantRepository).to(TennantRepository)


    // action 
    container.bind(TYPES.CreateTennantAction).to(CreateTennantAction)
    container.bind(TYPES.GetTennantAction).to(GetTennantAction)

    // presentation 
    container.bind(TYPES.CreateTennantPresentation).to(CreateTennantPresentation)
    container.bind(TYPES.GetTennantPresentation).to(GetTennantPresentation)

    // events
    // container.bind(TYPES.WorkHiringEvents).toConstantValue(new WorkHiringEventObserver(eventManager))

    return container
}