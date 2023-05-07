const { HttpError } = require('../helpers');

const checkContactExists = (contact, contactId) => {
  if (!contact) {
    throw new HttpError(404, `Contact with ${contactId} not found`);
  }
};

module.exports = checkContactExists;
