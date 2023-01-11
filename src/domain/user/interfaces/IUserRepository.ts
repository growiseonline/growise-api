import { User } from "../entity/user.entity"
import { IUser } from "./IUser"


export interface IFindUserProps {
    login?: string
    email?: string
    id?: string
    throwError?: boolean
}

export interface IUserRepository {
    insert(props: IUser): Promise<void>
    findOne(props: IFindUserProps): Promise<User | null>
}