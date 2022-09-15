const { acceptFormats } = require("../constants/acceptFormats");
const { BadRequestError, NotFoundError, ValidationError } = require("../models/errors")

const errorHandlerMiddleware = (err, _, res, __) => {
    const message = { message: err.message};

    if(err instanceof BadRequestError) {
        return res.status(404).json(message);
    }
    if(err instanceof NotFoundError) {
        return res.status(404).json(message);
    }
    if(err instanceof ValidationError) {
        message.accepted = acceptFormats[err.key];

        return res.status(400).json(message);
    }

    return res.status(500).json({ message: 'Internal server error' });
}

module.exports = {
    errorHandlerMiddleware
}