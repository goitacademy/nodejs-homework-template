const { Contact } = require('../../models/contact');

const { NotFound } = require('http-errors');

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    if (!result) {
      throw new NotFound(404);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;
