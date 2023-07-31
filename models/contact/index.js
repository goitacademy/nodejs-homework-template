const { addSchema } = require('./addSchema');
const { Contact } = require('./contactSchema');
const { updateFavoriteSchema } = require('./updateFavoriteSchema');

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
};
