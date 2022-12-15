import { IGetTennantDataProps, IGetTennantDataResponse } from '../../app/tennant'
import { SyncronizeTennant } from '../../app/tennant/syncronize-tennat-database'
import { IPresentation } from '../../infrastructure/crosscutting/interfaces'
import { AplicationOptions, IHttpRoute, IHttpServer } from '../../infrastructure/http/server/interfaces'
import { TYPES } from '../../infrastructure/ioc/types'

const route: IHttpRoute = {
    method: 'GET',
    routeProps: {
        path: '/info/tennant',
        async handler(request, aplication: AplicationOptions) {


            const syncronyzer = await aplication.context.get<SyncronizeTennant>(TYPES.SyncronizeTennant)
            const getTennantdataPresentation = await aplication.context.get<IPresentation<IGetTennantDataProps, IGetTennantDataResponse>>(TYPES.GetTennantDataPresentation)

            const syncronizedb = await syncronyzer.execute({ slug: request.headers.tennant as string });

            const tennandData = await getTennantdataPresentation.execute({ slug: request.headers.tennant as string })

            return { ...tennandData, isconected: syncronizedb.connectionmanager.isconected }
        },

    }

}

export default route