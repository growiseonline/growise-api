import joi from 'joi';
import { ICreateWorkHiringProps } from "../../../app/work-hiring";
import { ContratationTypeEnum } from "../../../domain/work_hiring/enum";
import { createValidationPayloadFromJoi } from "../../../infrastructure/crosscutting/utils";

export const WorkHiringQueryValidation = createValidationPayloadFromJoi(joi.object().empty())

export const WorkHiringValidation = createValidationPayloadFromJoi(joi.object<ICreateWorkHiringProps>({
    contratationType: joi.string().valid(...Object.values(ContratationTypeEnum)),
    description: joi.string().min(5).max(50000),
    name: joi.string().min(5).max(100),
}),)


export const DetailWorkValidation = createValidationPayloadFromJoi(joi.object({
    id: joi.string().uuid(),
}))

export const UpdateWorkHiringPresentation = createValidationPayloadFromJoi(joi.object({
    contratationType: joi.string().valid(...Object.values(ContratationTypeEnum)),
    description: joi.string().min(5).max(50000),
    name: joi.string().min(5).max(100),
    id: joi.string().uuid(),
}))