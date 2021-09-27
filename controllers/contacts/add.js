const contacstOperations = require('../../model/contacts');

const add = async (req, res, next) => {
  try {
    const contact = await contacstOperations.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error)
  }
};

module.exports = {
  add
};
