const { isObjectIdOrHexString } = require('mongoose');
const { requestError } = require('../helpers/apiHelpers');

const isValidId = (req, _, next) => {
    const { id } = req.params;
    const isCorrectId = isObjectIdOrHexString(id);

    if (!isCorrectId) {
        const error = requestError(400, `${id} is not correct Id format`);
        next(error);
    }

    next();
};

module.exports = isValidId;