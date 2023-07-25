const { Contact } = require("../../models");
const service = require("../../service");

const getContactsById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  service.CheckByError(!result, 404);
  res.status(200).json(result);
};

module.exports = service.ctrlWrap(getContactsById);
