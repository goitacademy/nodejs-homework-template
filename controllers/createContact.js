const { addContact } = require('../models/contacts');
const { schema } = require('../schemas/joiSchema');

const createContact = async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(500).json({ massage: 'Missing required name field' });
    }

    const { name, email, phone } = req.body;
    const newContact = await addContact({ name, email, phone });

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

module.exports = { createContact };
