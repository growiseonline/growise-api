import { inject, injectable } from "inversify";
import { DataSource } from "typeorm";
import { IUser } from "../../../domain/user/interfaces/IUser";
import { IFindUserProps, IUserRepository } from "../../../domain/user/interfaces/IUserRepository";
import { TYPES } from "../../ioc/types";
import { UserSchema } from "../mysqldb/connection/schema/user.schema";

@injectable()
export class UserRepository implements IUserRepository {

    constructor(@inject(TYPES.SQLConnection) private readonly connection: DataSource) { }
    async insert(props: IUser) {
        await this.connection.getRepository(UserSchema).insert(props)
    }

    async findOne({ email, id, login }: IFindUserProps) {
        return await this.connection.getRepository(UserSchema).findOne({ where: { mail: email, id, login } })
    }
}