const { Contact } = require("../../models/contact");

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
