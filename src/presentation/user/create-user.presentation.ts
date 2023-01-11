import { inject, injectable } from "inversify";
import { ICreateUserProps, User } from "../../domain/user/entity/user.entity";
import { IFindUserProps } from "../../domain/user/interfaces/IUserRepository";
import { BadRequestError } from "../../infrastructure/crosscutting/errors";
import { IAction, IPresentation } from "../../infrastructure/crosscutting/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";

@injectable()
export class CreateUserPresentation implements IPresentation<ICreateUserProps, void> {
    constructor(
        @inject(TYPES.CreateUserAction) private readonly createUserAction: IAction<ICreateUserProps, User>,
        @inject(TYPES.FindUserAction) private readonly findUserAction: IAction<IFindUserProps, User>,
    ) { }

    async checkIfUsersExists(email: string, login: string) {
        const searchByName = await this.findUserAction.execute({ login })

        if (searchByName) {
            throw new BadRequestError('LoginAlradyInUse', 'This login name was already taken')
        }

        const searchByEmail = await this.findUserAction.execute({ email })

        if (searchByEmail) {
            throw new BadRequestError('EmailAlreadyInUse', 'This email is already in use')
        }
    }

    async execute(props: ICreateUserProps): Promise<void> {
        await this.checkIfUsersExists(props.email, props.login)

        await this.createUserAction.execute(props)

    }
}