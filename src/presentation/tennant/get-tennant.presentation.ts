import { inject, injectable } from "inversify";
import { IGetTennantProps } from "../../app/tennant";
import { Tennant } from "../../domain/tennant/entity";
import { IAction, IPresentation } from "../../infrastructure/crosscutting/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";

@injectable()
export class GetTennantPresentation implements IPresentation<IGetTennantProps, Tennant> {
    constructor(@inject(TYPES.GetTennantAction) private readonly getTennantAction: IAction<IGetTennantProps, Tennant>) { }

    async execute(props: IGetTennantProps): Promise<Tennant> {
        const tennant = await this.getTennantAction.execute(props)

        return tennant
    }

}