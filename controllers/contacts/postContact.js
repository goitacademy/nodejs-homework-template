const { Contact } = require('../../schema');
const { errorHandler } = require('../../helpers');
const { schemaJoiContact } = require('../../schema');

const { addSchema } = schemaJoiContact;

async function postContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw errorHandler(400, error.message);
    }

    const { _id: owner } = req.user;

    const result = await Contact.create({ ...req.body, owner: owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { postContact };
