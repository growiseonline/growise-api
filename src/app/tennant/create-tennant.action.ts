import { errorMonitor } from "events";
import { inject, injectable } from "inversify";
import { ICreateTennantFabric, Tennant } from "../../domain/tennant/entity";
import { ITennantEntity, ITennantRepository } from "../../domain/tennant/interfaces";
import { InternalServerError } from "../../infrastructure/crosscutting/errors";
import { IAction } from "../../infrastructure/crosscutting/interfaces";
import { generateRandomString, generateUUID } from "../../infrastructure/crosscutting/utils";
import { TENNANT_PORT, TENNANT_SERVER_URL } from "../../infrastructure/enviroment";
import { TYPES } from "../../infrastructure/ioc/types";


export interface ICreateTennantProps {
    name: string;
    slug: string;
}

@injectable()
export class CreateTennantAction implements IAction<ICreateTennantProps, ITennantEntity> {

    constructor(@inject(TYPES.TennantRepository) private readonly tennantRepository: ITennantRepository) { }

    async execute(props: ICreateTennantProps): Promise<ITennantEntity> {

        try {
            const userPasswordSize = 15
            const options: ICreateTennantFabric = {
                name: props.name,
                slug: props.slug,
                sqlConnection: {
                    host: TENNANT_SERVER_URL,
                    datbase: `growise_tnt_${generateUUID()}`,
                    username: `growise_usr_${generateUUID()}`,
                    password: generateRandomString({ size: userPasswordSize, useLowerCase: true, useNumbers: true, useUpperCase: true, useSpecialCharacters: false }),
                    port: TENNANT_PORT,
                    type: 'postgresql'
                }
            }
            const tennant = Tennant.create(options)

            await this.tennantRepository.insert(tennant)

            return tennant
        } catch (error) {
            throw new InternalServerError(error)
        }
    }
}