import { Schema } from "mongoose";
import { Tennant } from "../../../../domain/tennant/entity";

export const TennantSchema = new Schema<Tennant>({
    id: { type: 'string', required: true },
    createdAt: { type: 'date', required: true },
    updatedAt: { type: 'date', required: true },

    name: { type: 'string', required: true },
    slug: { type: 'string', required: true, unique: true, index: 'text' },
    sqlConnection: { type: 'object' },

})
