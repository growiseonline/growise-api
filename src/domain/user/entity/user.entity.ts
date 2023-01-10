import { generateRandomString, generateUUID } from "../../../infrastructure/crosscutting/utils";
import { IUser } from "../interfaces/IUser";


export interface ICreateUserProps {
    displayName: string
    login: string
    email: string
    password: string | undefined
}


export class User implements IUser {
    static DATABSE_NAME = 'user'
    id!: string;
    login!: string;
    displayName!: string;
    mail!: string;
    password!: string;
    createdAt!: Date;
    updatedAt!: Date;

    static create({ displayName, email, login, password }: ICreateUserProps) {
        const user = new User

        user.id = generateUUID()
        user.createdAt = new Date
        user.updatedAt = new Date

        user.displayName = displayName
        user.login = login
        user.mail = email
        user.password = password || generateRandomString({ size: 16, useLowerCase: true, useNumbers: true, useSpecialCharacters: true, useUpperCase: true })

        return user
    }
}