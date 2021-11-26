const contactsOperation = require('../../model');

const add = async (req, res, next) => {
  try {
    const data = req.body;
    const newContact = await contactsOperation.addContact(data);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
