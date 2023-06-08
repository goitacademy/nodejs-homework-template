const { dataValidator, HttpError, wrapper } = require("../../helpers");
const { updateContact } = require("../../models/contacts");

const updateById = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name && !email && !phone) {
    throw HttpError(400, "Missing fields");
  }

  const { error } = await dataValidator(req.body);

  if (error) {
    const err = error.details[0].path[0];

    throw HttpError(400, `Missing required '${err}' field`);
  }

  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = wrapper(updateById);
