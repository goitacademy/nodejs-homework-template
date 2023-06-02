const { isValidObjectId } = require('mongoose');
const {httpError} = require('../helpers/httpError')

const isValidId = (req, res, next) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        next(httpError(400, `${id} is not valid id`))
    }
};

module.exports = isValidId;