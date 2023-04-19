const { HttpError } = require("../../helpers");
const { Contact } = require("../../models");
const { ctrlWrapper } = require("../../utils");

const getContactById = async (req, res) => {
  const { id } = req.params;
  // const result = await Contact.findOne({ _id: id });
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contacts with ${id} not found`);
  }
  res.json(result);
};
module.exports = { getContactById: ctrlWrapper(getContactById) };
