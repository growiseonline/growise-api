import { ICreateUserProps, User } from "../../domain/user/entity/user.entity";
import { IAction } from "../../infrastructure/crosscutting/interfaces";
import { AplicationOptions, IHttpRoute } from "../../infrastructure/http/server/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";
import { CreateUserValidation } from "../validation/user/create-user.validation";


const route: IHttpRoute = {
    method: 'POST',
    validation: { bodyValidation: CreateUserValidation },
    routeProps: {
        path: '/user',
        async handler(request, { context }: AplicationOptions) {

            const createUserPresentation = await context.get<IAction<ICreateUserProps, User>>(TYPES.CreateUserPresentation)

            const user = await createUserPresentation.execute(request.body)

            return user
        },

    }

}

export default route