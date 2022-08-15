const contacts = require("../models/contacts");
const { RequestError } = require("../helpers");
const contactSchema = require("../schemas/contact");

const add = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw RequestError(400, error.message);
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = add;
