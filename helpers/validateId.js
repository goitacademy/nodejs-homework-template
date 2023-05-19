const HttpError = require('./HttpError');

const validateId = contact => {
    if (!contact) throw HttpError(404, 'Contact with such id does not exist');
};

module.exports = validateId;
