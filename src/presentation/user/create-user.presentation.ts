import { inject, injectable } from "inversify";
import { ICreateUserProps, User } from "../../domain/user/entity/user.entity";
import { IAction, IPresentation } from "../../infrastructure/crosscutting/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";

@injectable()
export class CreateUserPresentation implements IPresentation<ICreateUserProps, void> {
    constructor(@inject(TYPES.CreateUserAction) private readonly createUserAction: IAction<ICreateUserProps, User>) { }

    async execute(props: ICreateUserProps): Promise<void> {
        await this.createUserAction.execute(props)
    }
}