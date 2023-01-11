import { inject, injectable } from "inversify";
import { User } from "../../domain/user/entity/user.entity";
import { IFindUserProps, IUserRepository } from "../../domain/user/interfaces/IUserRepository";
import { BadRequestError, ResourceNotFound } from "../../infrastructure/crosscutting/errors";
import { IAction } from "../../infrastructure/crosscutting/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";

@injectable()
export class FindUserAction implements IAction<IFindUserProps, User> {
    constructor(@inject(TYPES.UserRepository) private readonly userRepository: IUserRepository) { }

    private preValidate(props: IFindUserProps) {
        if (!props.email && !props.id && !props.login) {
            throw new BadRequestError('No search param passed')
        }
    }

    async execute(props: IFindUserProps): Promise<User> {
        this.preValidate(props)

        const user = await this.userRepository.findOne({ email: props.email, id: props.id, login: props.login })


        if (!user) {
            throw new ResourceNotFound('UserNotFound', 'User was not found')
        }

        return user
    }

}