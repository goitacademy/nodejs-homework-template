const contacts = require('../models/contacts');
const addSchema = require('../schemas/contacts');
const { HttpError } = require('../helpers'); 

const updateBuId = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "missing fields");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateBuId;