import { generateUUID } from "../../../infrastructure/crosscutting/utils";
import { ITennantEntity } from "../interfaces/ITennantEntity";

export interface ICreateTennantFabric {
    name: string;
    slug: string;
    sqlConnection: { [key: string]: any; }
}

export class Tennant implements ITennantEntity {

    id!: string
    createdAt!: Date
    updatedAt!: Date

    name!: string;
    slug!: string;
    sqlConnection!: { [key: string]: any; }

    static COLLECTION_NAME = 'tennant'

    static create(props: ICreateTennantFabric) {
        const tennant = new Tennant

        tennant.id = generateUUID()
        tennant.name = props.name
        tennant.slug = props.slug
        tennant.sqlConnection = props.sqlConnection

        tennant.createdAt = new Date
        tennant.updatedAt = new Date

        return tennant
    }

}