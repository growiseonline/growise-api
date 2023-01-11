import 'reflect-metadata'
import { EntitySchema } from "typeorm";
import { User } from "../../../../../domain/user/entity/user.entity";

export const UserSchema = new EntitySchema<User>({
    name: User.DATABSE_NAME,
    tableName: User.DATABSE_NAME,
    columns: {
        createdAt: { type: 'timestamp' },
        updatedAt: { type: 'timestamp' },
        displayName: { type: 'varchar' },
        id: { type: 'varchar', primary: true },
        login: { type: 'varchar' },
        mail: { type: 'varchar' },
        password: { type: 'varchar' },
    }
})