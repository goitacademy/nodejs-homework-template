const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");
const { updateSchema } = require("../../schemas/contscts");

const updateById = async (req, res, next) => {
  const { error } = updateSchema.validate(req.body);

  if (error) {
    throw RequestError(400, "the field is filled in incorrectly");
  }

  const { contactId } = req.params;
  const result = await contacts.updateContactById(contactId, req.body);

  if (!result) {
    throw RequestError(404, "Not found");
  }

  if (Object.keys(req.body).length < 1) {
    throw RequestError(400, "Missing fields");
  }

  res.json(result);
};

module.exports = updateById;
