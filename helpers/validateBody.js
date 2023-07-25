const RequestError = require('./RequestError');

const validateBody = (req, res, next) => {
    const body = req.body;
    if (Object.keys(body).length === 0) {
        throw RequestError(400, {message: 'missing fields'});
    }
    next();
}

module.exports = validateBody;