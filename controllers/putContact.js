const contacts = require('../models/contacts');
const { errorHandler } = require('../helpers');
const {addSchema} = require("../schema/shema");

async function putContact (req, res, next) {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw errorHandler(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact({ id: contactId, ...req.body });
    if (!result) {
      throw errorHandler(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {putContact};