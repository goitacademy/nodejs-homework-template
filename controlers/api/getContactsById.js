const { Contact } = require("../../models");
const { FindByIdError, ctrlWrap } = require("../../helpers");

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  FindByIdError(result);
  res.status(200).json(result);
};

module.exports = ctrlWrap(getContactsById);
