import * as joi from 'joi'
const convert = require('joi-to-json-schema')
const parse = require('joi-to-json')

export const ValidationSchema = joi.object({
    id: joi.string()
})

export interface IValidationSchema {
    validatePayload<T>(payload: T): Promise<T> | T,
    schemaInfo: { [key: string]: any }
}

export interface IValidationOptions {
    removeUnknownFields?: boolean
    abortEarly?: boolean

}

export function createValidationPayloadFromJoi(
    joiSchema: joi.ObjectSchema,
    { abortEarly = false, removeUnknownFields = true }: IValidationOptions = { abortEarly: false, removeUnknownFields: true }
): IValidationSchema {
    const validatePayload = <T>(payload: T) => {
        const { value, error } = joiSchema.validate(payload, { abortEarly, stripUnknown: removeUnknownFields })

        if (error) {
            throw error
        }

        return value
    }

    return {
        validatePayload,
        schemaInfo: covertValidationSchemaToJson(joiSchema)
    }
}

export function covertValidationSchemaToJson(schema: any) {
    if (!schema) {
        return {}
    }

    return parse(schema)
}