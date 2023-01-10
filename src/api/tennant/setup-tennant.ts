import { IGetTennantDataProps, IGetTennantDataResponse } from '../../app/tennant'
import { SyncronizeTennant } from '../../app/tennant/syncronize-tennat-database'
import { IPresentation } from '../../infrastructure/crosscutting/interfaces'
import { AplicationOptions, IHttpRoute, IHttpServer } from '../../infrastructure/http/server/interfaces'
import { TYPES } from '../../infrastructure/ioc/types'

const route: IHttpRoute = {
    method: 'POST',
    routeProps: {
        path: '/tennant/setup',
        async handler(request, aplication: AplicationOptions) {


            const syncronyzer = await aplication.context.get<SyncronizeTennant>(TYPES.SyncronizeTennant)

            const syncronizedb = await syncronyzer.execute({ slug: request.headers.tennant as string });

            return
        },

    }

}

export default route