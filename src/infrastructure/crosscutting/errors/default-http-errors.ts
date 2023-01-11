import { HttpError } from "./http-error";

export class InternalServerError extends HttpError {
    constructor(data?: any, stack?: any) {
        super(500, 'InternalServerError', 'Some unexpected error ocurred!', { data, stack })
    }
}

export class BadRequestError extends HttpError {
    constructor(ErrorName = 'BadRequestError', message = 'Somehing is wrong with your request') {
        super(400, ErrorName, message)
    }
}

export class ValidationError extends HttpError {
    constructor(message: string, data?: any) {
        super(400, 'ValidationError', message, { data, stack: undefined })
    }
}

export class ResourceNotFound extends HttpError {
    constructor(name = 'ResourceNotFound', message = 'The source was not found!') {
        super(404, name, message, { data: undefined, stack: undefined })
    }
}