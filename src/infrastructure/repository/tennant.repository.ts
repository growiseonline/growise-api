import { inject, injectable } from "inversify";
import mongoose from "mongoose";
import { Tennant } from "../../domain/tennant/entity";
import { ITennantEntity, ITennantRepository } from "../../domain/tennant/interfaces";
import { TennantSchema } from "../database/mongodb/schema";
import { TYPES } from "../ioc/types";

@injectable()
export class TennantRepository implements ITennantRepository {
    constructor(
        @inject(TYPES.NoSQLConnection) private readonly noSQLConnection: mongoose.Connection,
    ) { }

    async insert(props: ITennantEntity) {
        const Model = await this.noSQLConnection
            .model(Tennant.COLLECTION_NAME, TennantSchema)

        await Model.create(props)
    }

    async findBySlug(slug: string): Promise<Tennant | null> {
        const Model = await this.noSQLConnection
            .model(Tennant.COLLECTION_NAME, TennantSchema)

        const result = await Model.findOne({ slug }, { _id: false, __v: false })

        if (!result) {
            return null
        }

        const aaa = result.toObject<Tennant>()

        return aaa as Tennant
    }


}