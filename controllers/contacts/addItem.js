const Contact = require("../../models/contacts");
const RequestError = require("../../helpers/RequestError");

const schema = require("../../schemas/schemas");

const addItem = async (req, res) => {
  const newContact = req.body;
  const { _id: owner } = req.user;
  const { error } = schema.newContact.validate(newContact);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await Contact.create({ ...newContact, owner });
  res.status(201).json(result);
};

module.exports = addItem;
