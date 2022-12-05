const { Contact } = require("../../models/contact");
const { createError } = require("../../helpers");

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw createError(404, "Not found");
  }
  res.json(result);
};

module.exports = getContactById;
