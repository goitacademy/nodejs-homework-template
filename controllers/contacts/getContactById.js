const { Contact } = require("../../models/contact.js");
const { HttpError, ctrlWrapper } = require("../../helpers/index.js");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
};
