const {HttpError} = require('../helpers');

const checkCreate = schema => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) throw new HttpError(400, error.message)
    next()
}

const checkUpdate = schema => (req, res, next) => {
    if (Object.keys(req.body).length === 0) throw new HttpError(400, 'missing fields');
    const { error } = schema.validate(req.body);
    if (error) throw new HttpError(400, error.message)
    next()
}

module.exports = {checkCreate, checkUpdate};