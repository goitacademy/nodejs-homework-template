class HttpError extends Error {
    static codeMessage = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        408: 'Request Timeout',
        409: 'Conflict',
        500: 'Internal Server Error',
        501: 'Not Implemented',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        504: 'Gateway Timeout',
    };
    constructor(status, message = HttpError.codeMessage[status]) {
        super(message);
        this.status = status;
    }
}

module.exports = HttpError;
