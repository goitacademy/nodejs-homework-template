const Contact = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} is not found`);
  }
  res.json(result);
};

module.exports = getContactById;
