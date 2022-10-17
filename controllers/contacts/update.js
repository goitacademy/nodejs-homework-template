const contacts = require("../../models/contacts");

const { addSchema } = require("../../schemas/contact");

const { RequestError } = require("../../helpers/RequestError");

const update = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      next(RequestError(400, error.message));
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = update;
