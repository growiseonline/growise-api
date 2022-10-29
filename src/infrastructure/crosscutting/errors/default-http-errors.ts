import { HttpError } from "./http-error";

export class InternalServerError extends HttpError {
    constructor(data?: any, stack?: any) {
        super(500, 'InternalServerError', 'Some unexpected error ocurrent!', { data, stack })
    }
}

export class BadRequestError extends HttpError {
    constructor(data?: any, stack?: any) {
        super(400, 'BadRequestError', 'Somehing is wrong with your request', { data, stack })
    }
}

export class ValidationError extends HttpError {
    constructor(message: string, data?: any) {
        super(400, 'ValidationError', message, { data, stack: undefined })
    }
}

export class ResourceNotFound extends HttpError {
    constructor(message = 'The source was not found!') {
        super(404, 'WorkHiringNotFound', message, { data: undefined, stack: undefined })
    }
}