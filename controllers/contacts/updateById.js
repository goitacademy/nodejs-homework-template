const contacts = require("../../models");

const { generateError } = require("../../helpers");

const scheme = require("../../schemas");

const updateById = async (req, res) => {
  const { error } = scheme.verifyContact.validate(req.body);

  if (error) {
    throw generateError(400, error.message);
  }

  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw generateError(404);
  }
  return res.json(result);
};

module.exports = updateById;
