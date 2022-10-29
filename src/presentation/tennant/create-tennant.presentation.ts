import { inject, injectable } from "inversify";
import { ICreateTennantProps } from "../../app/tennant";
import { ICreateTennantFabric } from "../../domain/tennant/entity";
import { ITennantEntity } from "../../domain/tennant/interfaces";
import { IAction, IPresentation } from "../../infrastructure/crosscutting/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";

@injectable()
export class CreateTennantPresentation implements IPresentation<ICreateTennantProps, void> {

    constructor(@inject(TYPES.CreateTennantAction) private readonly createTennantAction: IAction<ICreateTennantFabric, ITennantEntity>) { }

    async execute(props: ICreateTennantFabric): Promise<void> {
        await this.createTennantAction.execute(props)
    }

}