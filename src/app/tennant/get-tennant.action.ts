import { inject, injectable } from "inversify";
import { Tennant } from "../../domain/tennant/entity";
import { ITennantRepository } from "../../domain/tennant/interfaces";
import { HttpError } from "../../infrastructure/crosscutting/errors";
import { IAction } from "../../infrastructure/crosscutting/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";

export interface IGetTennantProps {
    slug: string
}

@injectable()
export class GetTennantAction implements IAction<IGetTennantProps, Tennant> {

    constructor(@inject(TYPES.TennantRepository) private readonly tennantRepository: ITennantRepository) { }

    async execute(props: IGetTennantProps): Promise<Tennant> {
        const tennant = await this.tennantRepository.findBySlug(props.slug)

        if (!tennant) {
            throw new HttpError(404, 'TennantNotFound', 'Tennant was not found')
        }

        return tennant
    }

}