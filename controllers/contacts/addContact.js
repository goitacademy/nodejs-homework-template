const { Contact } = require("../../models");

const addContact = async (req, res, next) => {
  try {
    const contacts = await Contact.create(req.body);

    res.status(201).json({ contacts });
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
