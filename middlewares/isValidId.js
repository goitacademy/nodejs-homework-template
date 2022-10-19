const { isValidObjectId } = require('mongoose');

const { RequestError } = require('../../helpers');

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
    const result = isValidObjectId(contactId);
    if (!result) {
        throw RequestError('Not found', 404)
    }
    next();
};

module.exports = isValidId;