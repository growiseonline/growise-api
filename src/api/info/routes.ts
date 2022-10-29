import { AplicationOptions, IHttpRoute, IHttpServer } from '../../infrastructure/http/server/interfaces'
import { TYPES } from '../../infrastructure/ioc/types'

const route: IHttpRoute = {
    method: 'GET',
    routeProps: {
        path: '/info/routes',
        async handler(request, aplication: AplicationOptions) {
            const httpServer: IHttpServer = aplication.context.get(TYPES.WebApiService)

            const routes = httpServer.getRoutes().map(route => {

                return {
                    path: route.routeProps.path,
                    method: route.method,
                    bodyValidation: route.validation?.bodyValidation?.schemaInfo,
                    paramValidation: route.validation?.queryValidation?.schemaInfo,
                    queryValidation: route.validation?.paramValidation?.schemaInfo,
                }
            })

            return {
                routes
            }
        },

    }
}

export default route