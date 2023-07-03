const { Contact } = require('../schema');
const { errorHandler } = require('../helpers');
const { schemaJoi } = require("../schema");

const { addSchema } = schemaJoi;


async function postContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw errorHandler(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {postContact};