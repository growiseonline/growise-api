import { inject, injectable } from "inversify";
import { ICreateUserProps, User } from "../../domain/user/entity/user.entity";
import { IUserRepository } from "../../domain/user/interfaces/IUserRepository";
import { IAction } from "../../infrastructure/crosscutting/interfaces/IAction";
import { TYPES } from "../../infrastructure/ioc/types";

@injectable()
export class CreateUserAction implements IAction<ICreateUserProps, User> {
    constructor(@inject(TYPES.UserRepository) private readonly userRepository: IUserRepository) { }
    async execute(props: ICreateUserProps): Promise<User> {
        const user = User.create(props)

        await this.userRepository.insert(user)
        return user
    }

}