import * as App from 'express';
import { Server } from "http";
import { Container, inject, injectable } from 'inversify';
import { TennantContainerManager } from '../../container-manager/TennantContainerManager';
import { InternalServerError, ValidationError } from '../../crosscutting/errors/default-http-errors';
import { IHttpError } from '../../crosscutting/interfaces/IHttpError';
import { TYPES } from '../../ioc/types';
import { HttpAxios } from '../axios/http-axios';
import { TennantMasterClient } from '../client/tennant-master-client';
import { AllowedHttpMethods, AplicationContext, IHttpRequest, IHttpRoute, IHttpRouteProps, IHttpRouteValidation, IHttpServer, IServerProps } from "./interfaces";

@injectable()
export class TennantApiHttpServer implements IHttpServer {
    private app!: App.Express
    private server!: Server
    private startTime: Date = new Date()

    private storedRoutes: IHttpRoute[] = []

    private tennantManagerClient = new TennantMasterClient(new HttpAxios)
    private tennantContextManager: TennantContainerManager = new TennantContainerManager(this, this.tennantManagerClient)

    constructor() {
        this.app = App.default()
        this.app.use(App.default.json())
    }

    getRoutes(): IHttpRoute[] {
        return this.storedRoutes
    }

    getStartTime(): Date {
        return this.startTime
    }

    async onServerUp(server: Server, serverProps: IServerProps) {
        this.startTime = new Date()
        console.log('Http server listening at port:', serverProps.port);

    }

    async start(serverProps: IServerProps): Promise<void> {

        serverProps.routes.forEach(route => {
            this.addRoute(route.method, route.routeProps, route.validation)
        })

        this.server = this.app.listen(serverProps.port, () => {
            this.onServerUp(this.server, serverProps)
        })

        this.storedRoutes = serverProps.routes

    }

    async addRoute(
        method: AllowedHttpMethods,
        { handler, path, after, before, }: IHttpRouteProps,
        validation?: IHttpRouteValidation
    ) {
        const methodDict = {
            'GET': this.app.get.bind(this.app),
            'POST': this.app.post.bind(this.app),
            'PUT': this.app.put.bind(this.app),
            'PATCH': this.app.patch.bind(this.app),
            'DELETE': this.app.delete.bind(this.app),
        }
        console.log(method, path);


        methodDict[method](path, async (expRequest, expResponse) => {

            try {
                const beforeFunctions = Array.isArray(before) ? before : [before]
                const afterFunctions = Array.isArray(after) ? after : [after]

                let request: IHttpRequest<any> = {
                    body: expRequest.body,
                    params: expRequest.params || {},
                    context: {},
                    headers: { ...expRequest.headers } as any,
                    query: expRequest.query || {}
                }


                const context: AplicationContext = {
                    // @ts-ignore-error
                    get: async (type: string) => {
                        const tennantData = await this.tennantContextManager.getTennantData(request.headers.tennant as string)

                        return tennantData.container.get(type)
                    }
                }

                if (validation) {
                    const { bodyValidation, paramValidation, queryValidation } = validation

                    try {
                        if (bodyValidation) {
                            request.body = bodyValidation.validatePayload(request.body)
                        }
                    } catch (error: any) {
                        throw new ValidationError('The payload passed in body is invalid', error)
                    }

                    try {
                        if (paramValidation) {
                            request.params = paramValidation.validatePayload(request.params)
                        }
                    } catch (error: any) {
                        throw new ValidationError('The payload param in body is invalid', error)
                    }

                    try {
                        if (queryValidation) {
                            request.query = queryValidation.validatePayload(request.query)
                        }
                    } catch (error: any) {
                        throw new ValidationError('The payload passed in query is invalid', error)
                    }
                }

                if (beforeFunctions) {
                    for (const onBefore of beforeFunctions) {
                        if (onBefore) {
                            request = await onBefore(request, { context })
                        }
                    }
                }

                let handlerResult = await handler(request, { context })

                if (afterFunctions) {
                    for (const onAfter of afterFunctions) {
                        if (onAfter) {
                            handlerResult = await onAfter(handlerResult)
                        }
                    }
                }

                if (method === 'POST') {
                    expResponse.status(201)
                }

                expResponse.json(handlerResult)
            } catch (err: any) {
                if ((err as IHttpError).statusCode) {
                    expResponse
                        .status(err.statusCode)
                        .json(err)

                    return
                }
                console.log('err', err);

                expResponse
                    .status(500)
                    .json(new InternalServerError(undefined, err))

            }
        })
    }

}