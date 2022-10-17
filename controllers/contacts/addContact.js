const { Contact, schemas } = require("../../models/contact");
const { RequestError } = require("../../helpers");

const addContact = async (req, res) => {
  const { error } = schemas.joiSchema.validate(req.body);
  if (error) {
    throw RequestError(400, "Missing fields");
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
