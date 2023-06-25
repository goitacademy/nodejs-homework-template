const contacts = require('../models/contacts');
const { errorHandler } = require('../helpers');
const {addSchema} = require("../schema/shema");

async function postContact(req, res, next) {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw errorHandler(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {postContact};