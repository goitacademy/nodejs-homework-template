const contacts = require("../../models/contacts");
const { RequestError, logger } = require("../../helpers");
const { addSchema } = require("../../schemas/contact");

const addContact = async (req, res, next) => {
  const error = addSchema.validate(req.body);
  logger.info(error);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};
module.exports = { addContact };
