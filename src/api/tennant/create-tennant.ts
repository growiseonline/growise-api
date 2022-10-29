import { ICreateTennantProps } from '../../app/tennant'
import { IPresentation } from '../../infrastructure/crosscutting/interfaces'
import { AplicationOptions, IHttpRoute, IHttpServer } from '../../infrastructure/http/server/interfaces'
import { TYPES } from '../../infrastructure/ioc/types'
import { CreateTennantValidation } from '../validation/work-hiting/tennant.validation'

const route: IHttpRoute = {
    method: 'POST',
    validation: {
        bodyValidation: CreateTennantValidation
    },
    routeProps: {
        path: '/tennant',
        handler: async ({ body }, aplication) => {
            const createTennantpresentation = aplication.context.get<IPresentation<ICreateTennantProps, void>>(TYPES.CreateTennantPresentation)

            await createTennantpresentation.execute(body)
        },

    }
}

export default route