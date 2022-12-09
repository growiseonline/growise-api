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

            const getTennantdataPresentation = aplication.context.get<IPresentation<IGetTennantDataProps, IGetTennantDataResponse>>(TYPES.GetTennantDataPresentation)
            const syncronizedb = await aplication.context.get<SyncronizeTennant>(TYPES.SyncronizeTennant).execute({slug :request.headers.tennant  as string});
           
            return {... await getTennantdataPresentation.execute({ slug: request.headers.tennant as string }), isconected : syncronizedb.connectionmanager.isconected}
        },

    }
    
}

export default route