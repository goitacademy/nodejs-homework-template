const contacts = require("../../models/contacts");
const HttpError = require("../../helpers");
const { addSchema } = require("../../schemas/contacts");


const updateContact = async (req, res, next) => {
  try {
     const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing field");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  }
  catch (error) {
    next(error);
  }
}
module.exports = updateContact;