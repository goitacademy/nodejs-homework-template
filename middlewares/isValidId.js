const { isValidObjectId } = require('mongoose');
const { httpError } = require('../helpers');

const isValidId = (req, _, next) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        next(httpError(400, `${id} is not valid id`));
    }
    next();
};

module.exports = isValidId;