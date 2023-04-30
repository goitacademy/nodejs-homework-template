const { isValidObjectId } = require('mongoose');
const { RequestError } = require('../helpers');

const isValidId = (requirement, response, next) => {
    const { id } = requirement.params;
    const result = isValidObjectId(id);

    if (!result) {
        next(RequestError(404, `${id} isn't valid, try again`))
    }
    next()
}

module.exports = isValidId;
