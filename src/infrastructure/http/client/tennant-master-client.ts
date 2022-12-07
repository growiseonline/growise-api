import { inject, injectable } from "inversify";
import { IGetTennantProps, IGetTennnatResponse } from "../../../app/tennant/interfaces";
import { TENNANT_API_BASE_URL } from "../../enviroment";
import { TYPES } from "../../ioc/types";
import { IHttpClient } from "./interfaces/IHttpClient";

@injectable()
export class TennantMasterClient {
    constructor(@inject(TYPES.HttpClient) private readonly httpClient: IHttpClient) { }

    async getTennant({ slug }: IGetTennantProps): Promise<IGetTennnatResponse> {
        const { data } = await this.httpClient.get(`${TENNANT_API_BASE_URL}/tennant/${slug}`, {}, {})

        return data
    }

}