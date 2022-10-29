import { createValidationPayloadFromJoi } from "../../../infrastructure/crosscutting/utils";
import joi from 'joi';
import { ICreateTennantProps } from "../../../app/tennant";

export const CreateTennantValidation = createValidationPayloadFromJoi(joi.object<ICreateTennantProps>({
    name: joi.string().min(5).max(40),
    slug: joi.string().min(3).max(35)
}),)
