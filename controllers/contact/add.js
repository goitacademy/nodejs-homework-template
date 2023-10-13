const contacts = require("../../models/contacts");
const schema = require("../../schemas/schema");
const add = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const value = await schema.validateAsync({ name, email, phone });
    const contact = await contacts.addContact(value);
    res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = add;
