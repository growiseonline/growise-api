import { Container } from "inversify";
import 'reflect-metadata';
import { EventEmitter } from "stream";
import { DataSource } from 'typeorm';
import { GetTennantDataAction, IGetTennantDataProps, IGetTennantDataResponse } from "../../app/tennant";
import { GetTennantDataPresentation } from "../../presentation/tennant/get-tennant-data.presentation";
import { IAction, IPresentation } from "../crosscutting/interfaces";
import { EventManager } from "../event-manager";
import { HttpAxios } from "../http/axios/http-axios";
import { IHttpClient } from "../http/client/interfaces/IHttpClient";
import { TennantMasterClient } from "../http/client/tennant-master-client";
import { ApiHttpServer } from '../http/server/api-http-server';
import { IHttpServer } from '../http/server/interfaces';
import { TYPES } from './types';


export async function handleIoc(sqlConnection: any, noSqlConnection: any) {
    const eventManager = new EventManager(new EventEmitter())
    const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

    container.bind(TYPES.EventManager).toConstantValue(eventManager)

    // infrastructure
    container.bind(TYPES.AplicationContext).toConstantValue(container)

    container.bind<DataSource>(TYPES.SQLConnection).toConstantValue(sqlConnection)

    container.bind<IHttpServer>(TYPES.WebApiService).to(ApiHttpServer)
    container.bind<IHttpClient>(TYPES.HttpClient).to(HttpAxios)

    // repository   

    // action  
    container.bind<IAction<IGetTennantDataProps, IGetTennantDataResponse>>(TYPES.GetTennantDataAction).to(GetTennantDataAction)


    // presentation  
    container.bind<IPresentation<IGetTennantDataProps, IGetTennantDataResponse>>(TYPES.GetTennantDataPresentation).to(GetTennantDataPresentation)

    // events 

    // clients
    container.bind(TYPES.TennantMasterClient).to(TennantMasterClient)

    return container
}