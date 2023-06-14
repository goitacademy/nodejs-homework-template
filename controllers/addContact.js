const { createNewContact } = require("../models/contacts");

const addContact = async (req, res, next) => {
  try {
    const result = await createNewContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
