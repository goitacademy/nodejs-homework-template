const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id:${id} not found`);
  }
  res.status(200).json(result);
};

module.exports = getContactById;
