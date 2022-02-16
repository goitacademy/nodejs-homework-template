const contacts = require('../../models/contacts');
const CreateError = require('http-errors');
const { contactSchema } = require('../../schema');

const addNew = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw new CreateError(400, error.message);
    }
    const { name, email, phone } = req.body;
    const data = await contacts.addContact(name, email, phone);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = addNew;
