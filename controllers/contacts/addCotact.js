const contacts = require("../../models/contacts");
const HttpError = require("../../helpers");
const {addSchema} = require("../../schemas/contacts")

const addContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
 
}

module.exports = addContact;