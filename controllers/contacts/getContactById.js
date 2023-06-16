const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../helpers");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
};
