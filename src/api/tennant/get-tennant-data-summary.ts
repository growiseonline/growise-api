import { IGetTennantDataProps, IGetTennantDataResponse } from '../../app/tennant'
import { IPresentation } from '../../infrastructure/crosscutting/interfaces'
import { AplicationOptions, IHttpRoute, IHttpServer } from '../../infrastructure/http/server/interfaces'
import { TYPES } from '../../infrastructure/ioc/types'

const route: IHttpRoute = {
    method: 'GET',
    routeProps: {
        path: '/info/tennant',
        async handler(request, aplication: AplicationOptions) {

            const getTennantdataPresentation = aplication.context.get<IPresentation<IGetTennantDataProps, IGetTennantDataResponse>>(TYPES.GetTennantDataPresentation)

            return getTennantdataPresentation.execute({ slug: request.headers.tennant as string })
        },

    }
}

export default route