const { HttpError, wrapper } = require("../../helpers");
const { getContactById } = require("../../models/contacts");

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = wrapper(getById);
