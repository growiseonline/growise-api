import { inject, injectable } from "inversify";
import { IGetTennantDataProps, IGetTennantDataResponse } from "../../app/tennant";
import { IAction, IPresentation } from "../../infrastructure/crosscutting/interfaces";
import { TYPES } from "../../infrastructure/ioc/types";

@injectable()
export class GetTennantDataPresentation implements IPresentation<IGetTennantDataProps, IGetTennantDataResponse>  {
    constructor(@inject(TYPES.GetTennantDataAction) private readonly getTennantAction: IAction<IGetTennantDataProps, IGetTennantDataResponse>) { }

    async execute({ slug }: IGetTennantDataProps): Promise<IGetTennantDataResponse> {
        return await this.getTennantAction.execute({ slug })
    }

}