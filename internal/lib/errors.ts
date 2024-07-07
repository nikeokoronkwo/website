interface StatusError {
    statusCode: number;
}

interface ErrorOptions {
  name?: string;
  message?: string;
  statusCode?: number;
}

export class BaseError extends Error implements StatusError {
    statusCode: number;

    constructor(options: ErrorOptions) {
        super(options.message);
        this.statusCode = options.statusCode ?? 500;
        this.name = options.name ?? "Unknown Error";
    }
}

export class InternalError extends BaseError {}

export class RepresentableError extends BaseError {}

export function createError(options: ErrorOptions): RepresentableError {
    return new RepresentableError(options);
}