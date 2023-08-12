const {validateContact, handleMissingFields} = require('../../middleware/validationMiddleware')
const { addContact } = require("../../models/contacts");

const createNew = async (req, res, next) => {
    try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = [handleMissingFields, validateContact, createNew];