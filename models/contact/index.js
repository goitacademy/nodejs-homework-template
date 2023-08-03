const { Contact } = require('./contactSchema');
const { addSchema } = require('./addSchema');
const { updateFavoriteSchema } = require('./updateFavoriteSchema');

module.exports = {
  Contact,
  addSchema,
  updateFavoriteSchema,
};
