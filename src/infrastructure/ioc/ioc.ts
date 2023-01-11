import { Container } from "inversify";
import 'reflect-metadata';
import { EventEmitter } from "stream";
import { DataSource } from 'typeorm';
import { GetTennantDataAction, IGetTennantDataProps, IGetTennantDataResponse } from "../../app/tennant";
import { ISyncronizeDatabaseResponse, ISyncronizeTennantProps, SyncronizeTennant } from "../../app/tennant/syncronize-tennat-database";
import { CreateUserAction } from "../../app/user/create-user.action";
import { FindUserAction } from "../../app/user/find-user.action";
import { IUserRepository } from "../../domain/user/interfaces/IUserRepository";
import { GetTennantDataPresentation } from "../../presentation/tennant/get-tennant-data.presentation";
import { CreateUserPresentation } from "../../presentation/user/create-user.presentation";
import { IAction } from "../crosscutting/interfaces";
import { UserRepository } from "../database/repository/user.repository";
import { EventManager } from "../event-manager";
import { HttpAxios } from "../http/axios/http-axios";
import { IHttpClient } from "../http/client/interfaces/IHttpClient";
import { TennantMasterClient } from "../http/client/tennant-master-client";
import { IHttpServer } from '../http/server/interfaces';
import { TYPES } from './types';


export async function handleTennantIoc(sqlConnection: any, apiHttpServer: any) {
    const eventManager = new EventManager(new EventEmitter())
    const container = new Container({ autoBindInjectable: true, defaultScope: 'Singleton' });

    container.bind(TYPES.EventManager).toConstantValue(eventManager)

    // infrastructure
    container.bind(TYPES.AplicationContext).toConstantValue(container)

    container.bind<DataSource>(TYPES.SQLConnection).toConstantValue(sqlConnection)

    container.bind<IHttpServer>(TYPES.WebApiService).toConstantValue(apiHttpServer)
    container.bind<IHttpClient>(TYPES.HttpClient).to(HttpAxios)

    // repository   
    container.bind<IUserRepository>(TYPES.UserRepository).to(UserRepository)

    // action  
    container.bind<IAction<IGetTennantDataProps, IGetTennantDataResponse>>(TYPES.GetTennantDataAction).to(GetTennantDataAction)
    container.bind<IAction<ISyncronizeTennantProps, ISyncronizeDatabaseResponse>>(TYPES.SyncronizeTennant).to(SyncronizeTennant)
    container.bind(TYPES.CreateUserAction).to(CreateUserAction)
    container.bind(TYPES.FindUserAction).to(FindUserAction)


    // presentation  
    container.bind(TYPES.GetTennantDataPresentation).to(GetTennantDataPresentation)
    container.bind(TYPES.CreateUserPresentation).to(CreateUserPresentation)

    // events 

    // clients
    container.bind(TYPES.TennantMasterClient).to(TennantMasterClient)

    return container
}