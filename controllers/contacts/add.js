const { Contact, schemas } = require("../../models/contacts");
const createError = require("../../helpers/createError");

const createContacts = async (req, res, next) => {
  const { error } = schemas.add.validate(req.body);
  if (error) {
    throw createError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};
module.exports = createContacts;
