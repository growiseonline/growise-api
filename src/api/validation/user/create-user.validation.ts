import { createValidationPayloadFromJoi } from "../../../infrastructure/crosscutting/utils";
import joi from 'joi'
import { ICreateUserProps } from "../../../domain/user/entity/user.entity";

export const CreateUserValidation = createValidationPayloadFromJoi(joi.object<ICreateUserProps>({
    displayName: joi.string().min(4).max(250),
    email: joi.string().email(),
    login: joi.string().min(3).max(25),
    password: joi.string().optional(),
}))