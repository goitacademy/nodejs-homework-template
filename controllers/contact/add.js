const contacts = require("../../models/contacts");
const add = async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = add;
