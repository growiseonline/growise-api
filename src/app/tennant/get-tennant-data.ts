import { inject, injectable } from "inversify";
import { HttpError, ResourceNotFound } from "../../infrastructure/crosscutting/errors";
import { IAction } from "../../infrastructure/crosscutting/interfaces";
import { TennantMasterClient } from "../../infrastructure/http/client/tennant-master-client";
import { TYPES } from "../../infrastructure/ioc/types";


export interface IGetTennantDataProps {
    slug: string
}

export interface IGetTennantDataResponse {
    name: string
    slug: string
    creationDate: Date
}

@injectable()
export class GetTennantDataAction implements IAction<IGetTennantDataProps, IGetTennantDataResponse> {

    constructor(@inject(TYPES.TennantMasterClient) private readonly tennantMasterClient: TennantMasterClient) { }

    async execute({ slug }: IGetTennantDataProps): Promise<IGetTennantDataResponse> {
        try {
            const tennantData = await this.tennantMasterClient.getTennant({ slug })

            return {
                creationDate: tennantData.createdAt,
                name: tennantData.name,
                slug: tennantData.slug,
            }
        } catch (err: any) {
            if (err.response.data.statusCode === 404) {
                throw new ResourceNotFound('TennantNotFound', 'The source you are looking for is not in this castle!')
            }

            throw err
        }
    }

}