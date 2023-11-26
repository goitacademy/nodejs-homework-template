const contactOperation = require("../../models/contacts");

const addContact = async (req, res, next) => {
  try {
    const result = await contactOperation.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
