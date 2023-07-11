const { Contact } = require('../../schema');
const { errorHandler } = require('../../helpers');
const { schemaJoiContact } = require('../../schema');

const { updateFavoriteSchema } = schemaJoiContact;

async function updateStatusContact(req, res, next) {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw errorHandler(400, 'missing field favorite');
    }

    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw errorHandler(404, 'Not found');
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { updateStatusContact };
