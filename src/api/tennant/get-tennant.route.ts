import { ICreateTennantProps, IGetTennantProps } from '../../app/tennant'
import { Tennant } from '../../domain/tennant/entity'
import { IPresentation } from '../../infrastructure/crosscutting/interfaces'
import { IHttpRoute } from '../../infrastructure/http/server/interfaces'
import { TYPES } from '../../infrastructure/ioc/types'

const route: IHttpRoute = {
    method: 'GET',
    validation: {
    },
    routeProps: {
        path: '/tennant/:slug',
        handler: async ({ params }, aplication) => {
            const getTennantPresentation = aplication.context.get<IPresentation<IGetTennantProps, Tennant>>(TYPES.GetTennantPresentation)
            return await getTennantPresentation.execute({ slug: params.slug })
        },

    }
}

export default route