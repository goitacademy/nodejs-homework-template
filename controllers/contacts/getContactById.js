const { Contact } = require("../../models");
const { ctrlWrapper, HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;

  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }
  return res.json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
};
