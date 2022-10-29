import { IHttpError } from "../interfaces/IHttpError";

export class HttpError implements IHttpError {
    data?: any;
    stack?: any;
    constructor(
        public readonly statusCode: number,
        public readonly name: string,
        public readonly message: string,
        info: { data: any, stack: any } = { data: '', stack: '' }

    ) {
        this.data = info.data;
        this.stack = info.stack;
    }

}