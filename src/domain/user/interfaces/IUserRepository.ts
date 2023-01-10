import { IUser } from "./IUser"

export interface IUserRepository {
    insert(props: IUser): Promise<void>
}