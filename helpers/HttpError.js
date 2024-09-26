class HttpError extends Error {
    constructor(status, message) {
        super(message || errorMesssages[status]);
        this.name = 'HttpError';
        this.status = status;
    }
}

const errorMesssages = {
    400: "missing fields",
    401: "Not authorized",
    404: "Not found",
    409: "Email in use",
};

module.exports = HttpError;
