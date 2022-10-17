const contacts = require("../../models/contacts");

const { addSchema } = require("../../schemas/contact");

const { RequestError } = require("../../helpers");

const update = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    next(RequestError(400, error.message));
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  res.json(result);
};

module.exports = update;
