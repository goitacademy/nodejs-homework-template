const { Contact, schemas } = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const add = async (req, res) => {
  const { error } = schemas.addContactShema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

module.exports = add;
