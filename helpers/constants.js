const HttpCode = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
};

const Subscription = {
    STARTER: "starter",
    PRO: "pro",
    BUSINESS: "business"
};

const limiterAPI = {
    windowMs: 15 * 60 * 1000,
    max: 1000,
    handler: (req, res, next) => {
        return res.status(HttpCode.TOO_MANY_REQUEST).json({
            status: 'error',
            code: HttpCode.TOO_MANY_REQUESTS,
            message: 'Too many requests ...'
        });
    },
};

module.exports = { HttpCode, limiterAPI, Subscription };