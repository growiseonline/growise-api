import { createValidationPayloadFromJoi } from "../../infrastructure/crosscutting/utils/validation.utils";
import * as joi from 'joi'

export const UUIDRouteParamValidation = createValidationPayloadFromJoi(joi.object({ id: joi.string().uuid().required() }))
export const ObjectIsEmptyValidation = createValidationPayloadFromJoi(joi.object().required().empty())